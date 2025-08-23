import React from "react";
import {
  Drawer,
  Typography,
  Button,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { useCart } from "../../context/CartContext.jsx";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import './SideCart.css';

const SideCart = ({ open, onClose }) => {
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleContinueShopping = () => {
    onClose();
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "500px",
          backgroundColor: "#0f0f19c1",
          backdropFilter: "blur(3px)",
          border: "1px solid #ffffff1a",
        },
      }}
    >
      <Box sx={{ p: 3, display: "flex", flexDirection: "column", height: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold", color: "#949dff" }}>
            Your Cart
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: "rgba(248, 250, 252, 0.7)" }} />
          </IconButton>
        </Box>
        {cartItems.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 10, fontSize: 35, color: '#f8fafc' }}>
            <FontAwesomeIcon icon={faBagShopping} />
            <Typography sx={{ mt: 2, fontSize: 20 }}>Your cart is empty</Typography>
            <Button variant="contained" sx={{ mt: 2, borderRadius: 999 }} onClick={handleContinueShopping}>
              Continue Shopping
            </Button>
            <Box sx={{ height: 185 }}></Box>
          </Box>
        ) : (
          <>
            <Box sx={{ mt: 4, flex: 1, overflowY: "auto", scrollbarWidth: "none" }}>
              {cartItems.map((item) => (
                <Box key={item.id} sx={{ display: "flex", py: 2, borderBottom: "1px solid", borderColor: "divider" }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 2,
                      overflow: "hidden",
                      flexShrink: 0,
                      bgcolor: "background.default",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                  <Box sx={{ ml: 2, flex: 1, color: "#f8fafc" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">{item.name}</Typography>
                      <Typography variant="subtitle1">R {item.price.toFixed(2)}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                      <Typography variant="body2" color="#f8fafcb3">
                        Qty {item.quantity}
                      </Typography>
                      <Button
                        size="small"
                        sx={{ color: "#d32f2f" }}
                        onClick={() => removeItem(item.id)}
                      >
                        Remove
                      </Button>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box sx={{ pt: 2 }}>
              <Divider />
              <Box sx={{ display: "flex", justifyContent: "space-between", py: 2, color: "#f8fafc" }}>
                <Typography variant="subtitle1">Subtotal</Typography>
                <Typography variant="subtitle1">R {cartTotal.toFixed(2)}</Typography>
              </Box>
              <Typography variant="body2" color="#f8fafcb3" sx={{ mb: 2, fontWeight: 400 }}>
                Shipping and taxes calculated at checkout.
              </Typography>
              <Button variant="contained" fullWidth sx={{ borderRadius: 999, bgcolor: "#949dff" }} onClick={() => {
                navigate('/cart');
                onClose();
              }}>
                Cart
              </Button>
              <Button fullWidth sx={{ mt: 1, color: "#7c3aed", textTransform: "none" }} onClick={handleContinueShopping}>
                Continue Shopping
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default SideCart;
