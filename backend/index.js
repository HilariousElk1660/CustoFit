require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/CustoFit";
const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) throw new Error("JWT_SECRET must be configured");

const allowedOrigins = (process.env.FRONTEND_ORIGINS || "http://localhost:5173,http://localhost:4173,https://www.custo-fit.com.s3-website-us-east-1.amazonaws.com")
  .split(",").map((origin) => origin.trim()).filter(Boolean);
app.use(cors({ origin: allowedOrigins, credentials: true, methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json({ limit: "1mb" }));

let db;
async function connectToMongo() {
  const client = new MongoClient(uri);
  await client.connect();
  db = client.db("CustoFit");
  await db.collection("Users").createIndex({ email: 1 }, { unique: true });
}
const publicUser = (user) => ({ _id: user._id, name: user.name, email: user.email, avatar: user.avatar || null, theme: user.theme || "light", notifications: user.notifications !== false });
const issueSession = (res, user) => {
  const token = jwt.sign({ sub: user._id.toString(), email: user.email }, jwtSecret, { expiresIn: "7d", issuer: "custofit" });
  res.cookie("custofit_session", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", maxAge: 7 * 24 * 60 * 60 * 1000, path: "/" });
};
async function requireAuth(req, res, next) {
  try {
    const cookieToken = req.headers.cookie?.split(";").map((v) => v.trim()).find((v) => v.startsWith("custofit_session="))?.split("=")[1];
    const bearer = req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization.slice(7) : null;
    const payload = jwt.verify(cookieToken || bearer || "", jwtSecret, { issuer: "custofit" });
    const user = await db.collection("Users").findOne({ _id: new ObjectId(payload.sub) }, { projection: { passwordHash: 0 } });
    if (!user) return res.status(401).json({ error: "Unauthorized" });
    req.user = user;
    next();
  } catch { res.status(401).json({ error: "Unauthorized" }); }
}
const ownFilter = (req) => ({ userId: req.user._id.toString() });

app.post("/signup", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body || {};
  if (!name?.trim() || !email?.trim() || !password || !confirmPassword) return res.status(400).json({ error: "All fields are required" });
  if (!/^\S+@\S+\.\S+$/.test(email)) return res.status(400).json({ error: "Invalid email format" });
  if (password.length < 8) return res.status(400).json({ error: "Password must be at least 8 characters long" });
  if (password !== confirmPassword) return res.status(400).json({ error: "Passwords do not match" });
  try {
    const passwordHash = await bcrypt.hash(password, 12);
    const result = await db.collection("Users").insertOne({ name: name.trim(), email: email.trim().toLowerCase(), passwordHash, createdAt: new Date() });
    const user = { _id: result.insertedId, name: name.trim(), email: email.trim().toLowerCase() };
    issueSession(res, user);
    res.status(201).json({ message: "User created successfully", user: publicUser(user) });
  } catch (error) { res.status(error.code === 11000 ? 409 : 500).json({ error: error.code === 11000 ? "An account with this email already exists" : "Server error" }); }
});

app.post("/signin", async (req, res) => {
  const email = req.body?.email?.trim().toLowerCase();
  const password = req.body?.password;
  if (!email || !password) return res.status(400).json({ error: "Email and password are required" });
  const user = await db.collection("Users").findOne({ email });
  const valid = user?.passwordHash ? await bcrypt.compare(password, user.passwordHash) : false;
  if (!valid) return res.status(401).json({ error: "Invalid email or password" });
  issueSession(res, user);
  res.json({ message: "Login successful", user: publicUser(user) });
});
app.post("/signout", (req, res) => { res.clearCookie("custofit_session", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", path: "/" }); res.status(204).end(); });
app.get("/me", requireAuth, (req, res) => res.json({ user: publicUser(req.user) }));

app.use(requireAuth);
app.get("/users", async (req, res) => res.json([publicUser(req.user)]));
app.put("/users/:id", async (req, res) => {
  if (req.params.id !== req.user._id.toString()) return res.status(403).json({ error: "Forbidden" });
  const updates = {}; for (const key of ["name", "avatar", "theme", "notifications"]) if (req.body[key] !== undefined) updates[key] = req.body[key];
  await db.collection("Users").updateOne({ _id: req.user._id }, { $set: updates }); res.json({ updated: 1 });
});
app.get("/locations", async (req, res) => res.json(await db.collection("User Locations").find(ownFilter(req)).toArray()));
app.post("/locations", async (req, res) => { const result = await db.collection("User Locations").insertOne({ userId: req.user._id.toString(), location: req.body.location, createdAt: new Date() }); res.status(201).json({ id: result.insertedId }); });
app.put("/locations/:id", async (req, res) => { const result = await db.collection("User Locations").updateOne({ _id: new ObjectId(req.params.id), ...ownFilter(req) }, { $set: { location: req.body.location } }); res.json({ updated: result.modifiedCount }); });
app.delete("/locations/:id", async (req, res) => { const result = await db.collection("User Locations").deleteOne({ _id: new ObjectId(req.params.id), ...ownFilter(req) }); res.json({ deleted: result.deletedCount }); });
app.get("/inventory", async (_, res) => res.json(await db.collection("Inventory").find().toArray()));
app.get("/cart", async (req, res) => res.json(await db.collection("Cart").find(ownFilter(req)).toArray()));
app.post("/cart", async (req, res) => { const item = { ...req.body, userId: req.user._id.toString(), quantity: Math.max(1, Math.floor(Number(req.body.quantity) || 1)) }; const result = await db.collection("Cart").insertOne(item); res.status(201).json({ id: result.insertedId, ...item }); });
app.put("/cart/:id", async (req, res) => { const quantity = Math.floor(Number(req.body.quantity)); if (!Number.isFinite(quantity) || quantity < 1) return res.status(400).json({ error: "Invalid quantity" }); const result = await db.collection("Cart").updateOne({ _id: new ObjectId(req.params.id), ...ownFilter(req) }, { $set: { quantity } }); res.json({ updated: result.modifiedCount }); });
app.delete("/cart/:id", async (req, res) => { const result = await db.collection("Cart").deleteOne({ _id: new ObjectId(req.params.id), ...ownFilter(req) }); res.json({ deleted: result.deletedCount }); });
app.get("/orders", async (req, res) => res.json(await db.collection("Orders").find(ownFilter(req)).sort({ createdAt: -1 }).toArray()));
app.post("/orders", async (req, res) => { const order = { ...req.body, userId: req.user._id.toString(), createdAt: new Date(), status: "confirmed" }; const result = await db.collection("Orders").insertOne(order); await db.collection("Cart").deleteMany(ownFilter(req)); res.status(201).json({ id: result.insertedId, ...order }); });
app.put("/orders/:id", async (req, res) => { const result = await db.collection("Orders").updateOne({ _id: new ObjectId(req.params.id), ...ownFilter(req) }, { $set: { status: req.body.status } }); res.json({ updated: result.modifiedCount }); });
app.delete("/orders/:id", async (req, res) => { const result = await db.collection("Orders").deleteOne({ _id: new ObjectId(req.params.id), ...ownFilter(req) }); res.json({ deleted: result.deletedCount }); });

if (require.main === module) app.listen(port, async () => { await connectToMongo(); console.log(`Server is running on port ${port}`); });
module.exports = { app, connectToMongo };
