import { useNavigate, useLocation } from "react-router-dom";
import "./SignUp.css";
import React, { useState, useEffect } from "react";

function SignUp({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");
  const ipFromUrl = queryParams.get("ip");

  const [backendUrl, setBackendUrl] = useState(() => {
    // initialize from URL or fallback to localStorage
    const savedIp = localStorage.getItem("backendIp");
    return ipFromUrl
      ? `http://${ipFromUrl}:3000`
      : savedIp
      ? `http://${savedIp}:3000`
      : null;
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoginActive, setIsLoginActive] = useState(false);

  // 🔹 Watch for IP in URL and update localStorage + backendUrl
  useEffect(() => {
    if (ipFromUrl) {
      localStorage.setItem("backendIp", ipFromUrl);
      setBackendUrl(`http://${ipFromUrl}:3000`);
    }
  }, [ipFromUrl]);

  // 🔹 Mode toggle (login/signup)
  useEffect(() => {
    if (mode === "login") setIsLoginActive(true);
    else if (mode === "signup") setIsLoginActive(false);
  }, [mode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch(`${backendUrl}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Signup failed");

      alert("Sign up successful!");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      navigate("/signup?mode=login");
    } catch (err) {
      console.error("Sign up error:", err);
      alert(`Error: ${err.message}`);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${backendUrl}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Login failed:", data, backendUrl);
        alert(data.error || "Login failed");
        return;
      }

      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);

      const userSettings = {
        name: data.name || data.user?.name || "",
        email: data.email || data.user?.email || formData.email.trim(),
        notifications: data.notifications ?? data.user?.notifications ?? true,
        theme: data.theme || data.user?.theme || "light",
        avatar: data.avatar || data.user?.avatar || null,
      };

      localStorage.setItem("userSettings", JSON.stringify(userSettings));

      alert(`Welcome back!`);
      console.log("Login success:", data);
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleToggle = (isLogin) => {
    setIsLoginActive(isLogin);
    navigate(`/signup?mode=${isLogin ? "login" : "signup"}`);
  };

  return (
    <div className="main">
      <div className="form__container">
        <div className="form__content">
          <div>
            <div className="login__signup__toggle__container">
              <button
                className={`login__btn ${isLoginActive ? "active" : ""}`}
                onClick={() => handleToggle(true)}
              >
                Login
              </button>
              <button
                className={`signup__btn ${!isLoginActive ? "active" : ""}`}
                onClick={() => handleToggle(false)}
              >
                Register
              </button>
            </div>
            <div className="because__why__not"></div>
            {isLoginActive ? (
              <div className="login__form">
                <form onSubmit={handleLogin}>
                  <div className="signup__form__header">
                    <h3>Login</h3>
                    <p>Enter your credentials to access your account</p>
                  </div>
                  <div className="signup__form__inputs">
                    <div className="signup__email__input">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        placeholder="name@example.com"
                        required
                        type="email"
                        onChange={handleChange}
                        autoComplete="email"
                        name="email"
                      />
                    </div>
                    <div className="signup__password__input inputs__mt">
                      <div className="password__forgot">
                        <label htmlFor="login__password">Password</label>
                        <a>Forgot password?</a>
                      </div>
                      <input
                        id="login__password"
                        required
                        type="password"
                        onChange={handleChange}
                        autoComplete="current-password"
                        name="password"
                      />
                    </div>
                  </div>
                  <div className="signup__form__btn">
                    <button type="submit">Login</button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="signup__form">
                <form onSubmit={handleSignUp}>
                  <div className="signup__form__header">
                    <h3>Create an account</h3>
                    <p>Enter your information to create an account</p>
                  </div>
                  <div className="signup__form__inputs">
                    <div className="signup__name__input">
                      <label htmlFor="name">Name</label>
                      <input
                        id="name"
                        placeholder="Your Name"
                        required
                        onChange={handleChange}
                        autoComplete="name"
                        name="name"
                      />
                    </div>
                    <div className="signup__email__input inputs__mt">
                      <label htmlFor="register__email">Email</label>
                      <input
                        id="register__email"
                        placeholder="name@example.com"
                        required
                        type="email"
                        onChange={handleChange}
                        autoComplete="email"
                        name="email"
                      />
                    </div>
                    <div className="signup__password__input inputs__mt">
                      <label htmlFor="register__password">Password</label>
                      <input
                        id="register__password"
                        required
                        type="password"
                        onChange={handleChange}
                        autoComplete="new-password"
                        name="password"
                      />
                    </div>
                    <div className="signup__confirm__password__input inputs__mt">
                      <label htmlFor="register__confirm__password">
                        Confirm Password
                      </label>
                      <input
                        id="register__confirm__password"
                        required
                        type="password"
                        onChange={handleChange}
                        autoComplete="new-password"
                        name="confirmPassword"
                      />
                    </div>
                  </div>
                  <div className="signup__form__btn">
                    <button type="submit">Create account</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
