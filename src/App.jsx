import {
  BrowserRouter as Router,
  useLocation,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import SignUp from "./pages/SignUp/SignUp.jsx";
import Home from "./pages/Home/Home.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import SideCart from "./components/SideCart/SideCart.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Studio from "./pages/Design Studio/Studio.jsx";
import Products from "./pages/Products/Products.jsx";
import Cart from "./pages/Cart/Cart.jsx";
import Checkout from "./pages/Checkout/Checkout.jsx";

function ProtectedRoute({ isAuthenticated, children }) {
  const location = useLocation();
  if (location.pathname === "/signup") {
    return children;
  }
  return isAuthenticated ? children : <Navigate to="/signup" />;
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartToggle = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <Router>
      <Navbar
        isAuthenticated={isAuthenticated}
        onCartClick={handleCartToggle}
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
      </Routes>
    </Router>
  );
}

export default App;
