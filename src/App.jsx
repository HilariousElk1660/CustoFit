import {
  BrowserRouter as Router,
  useLocation,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import React from "react";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Home from "./pages/Home/Home.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import SideCart from "./components/SideCart/SideCart.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Studio from "./pages/Design Studio/Studio.jsx";
import Products from "./pages/Products/Products.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";
import Orders from "./pages/Orders/Orders.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { ChatButton } from "./components/Assistant/ChatButton.jsx";
import { ChatModal } from "./components/Assistant/ChatModal.jsx";

function ProtectedRoute({ isAuthenticated, children }) {
  const location = useLocation();

  if (location.pathname === "/signup") {
    return children;
  }
  return isAuthenticated ? children : <Navigate to="/signup" />;
}

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen((prev) => !prev);
  };

  const user = {
    name: "Chibuzor Obi",
    avatar: "/static/images/avatar/1.jpg",
    menu: [
      { label: "My Orders", path: "/orders" },
      { label: "Settings", path: "/settings" },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
    navigate("/signup?mode=login");
  };

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        onCartClick={handleCartToggle}
        user={user}
        onLogout={handleLogout}
      />
      <SideCart open={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <Routes>
        <Route
          path="/signup"
          element={<SignUp setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={<NotFound isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/studio"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Studio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>

      {isAuthenticated && (
        <ChatButton
          onClick={() => setIsChatModalOpen(true)}
          isAuthenticated={isAuthenticated}
        />
      )}

      <ChatModal
        isOpen={isChatModalOpen}
        onClose={() => setIsChatModalOpen(false)}
        isAuthenticated={isAuthenticated}
      />

      <Footer />
    </Router>
  );
}

export default App;
