import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import {
  SparklesIcon,
  MoonIcon,
  CartIcon,
  UserIcon,
} from "../../assets/Icons.jsx";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useCart } from "../../context/CartContext.jsx";

function Navbar({ isAuthenticated, onCartClick, user, onLogout }) {
  const location = useLocation();
  const showIcons = isAuthenticated && location.pathname !== "/signup";
  const { cartItems } = useCart();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
      const saved = JSON.parse(localStorage.getItem("userSettings"));
      if (saved) {
        setName(saved.name || "");
      }
    }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updated = JSON.parse(localStorage.getItem("userSettings"));
      if (updated) {
        setAvatar(updated.avatar || "");
        setName(updated.name || "");
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const isActive = (path) => location.pathname === path;

  return (
    <div className="nav-bar">
      <div className="nav-icons">
        {showIcons ? (
          <>
            <button className="in">
              <MoonIcon />
            </button>
            <button
              className="in"
              aria-describedby={id}
              type="button"
              onClick={handleClick}
            >
              <UserIcon />
            </button>
            <Popper id={id} open={open} anchorEl={anchorEl} transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Box
                    sx={{
                      p: 2,
                      bgcolor: "background.paper",
                      borderRadius: 2,
                      boxShadow: 3,
                      minWidth: 180,
                    }}
                  >
                    <div className="popper-content">
                      <Link className="popper-link bd_btm">
                        <Avatar alt={name || "User"} src={avatar || ""} />
                        <p className="popper-greeting">{name}</p>
                      </Link>

                      {user?.menu?.map((item, idx) => (
                        <Link key={idx} to={item.path} className="popper-link">
                          {item.label}
                        </Link>
                      ))}

                      <button className="popper-logout" onClick={onLogout}>
                        Log Out <ExitToAppIcon />
                      </button>
                    </div>
                  </Box>
                </Fade>
              )}
            </Popper>
            <button
              className="in"
              onClick={onCartClick}
              style={{ cursor: "pointer", position: "relative" }}
            >
              <CartIcon />
              {totalItems > 0 && (
                <span className="cart-count">{totalItems}</span>
              )}
            </button>
          </>
        ) : (
          <>
            <Link to="/signup?mode=login">
              <button className="auth-button">Sign In</button>
            </Link>
            <Link to="/signup?mode=signup">
              <button className="auth-button">Sign Up</button>
            </Link>
          </>
        )}
      </div>

      <div className="nav-links">
        <Link
          className={`text-wrapper-2 ${isActive("/") ? "active-page" : ""}`}
          to="/"
        >
          Home
          <span
            className="line"
            style={{ width: isActive("/") ? "100%" : "" }}
          ></span>
        </Link>
        <Link
          className={`text-wrapper-2 ${
            isActive("/products") ? "active-page" : ""
          }`}
          to="/products"
        >
          Products
          <span
            className="line"
            style={{ width: isActive("/products") ? "100%" : "" }}
          ></span>
        </Link>
        <Link
          className={`text-wrapper-2 ${
            isActive("/studio") ? "active-page" : ""
          }`}
          to="/studio"
        >
          Design Studio
          <span
            className="line"
            style={{ width: isActive("/studio") ? "100%" : "" }}
          ></span>
        </Link>
      </div>

      <div className="logo">
        <Link to="/">
          <span>Custo</span>
          Fit <SparklesIcon />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
