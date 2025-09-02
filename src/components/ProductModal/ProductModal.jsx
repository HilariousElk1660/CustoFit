import React from "react";
import { useCart } from "../../context/CartContext";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./ProductModal.css";

export default function ProductModal({ open, onClose, product }) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addItem(product, 1);
      onClose(); // optional: close modal after adding
    }
  };

  if (!product) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box className="minimal-modal">
        <IconButton className="close-btn" onClick={onClose}>
          <CloseIcon />
        </IconButton>

        <div className="modal-content">
          <img
            src={product.image || "/placeholder.jpg"}
            alt={product.name}
            className="modal-image"
          />

          <div className="modal-info">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="price">R {Number(product.price || 0).toFixed(0)}</p>

            <div className="modal-actions">
              {product.customisable && (
                <a href={`/studio`} className="action-btn">
                  Customize
                </a>
              )}
              <button onClick={handleAddToCart} className="action-btn">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
