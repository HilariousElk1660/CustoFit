import React, { useState, useRef } from "react";
import { useCart } from "../../context/CartContext";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./ProductModal.css";

export default function ProductModal({ open, onClose, product }) {
  const { addItem } = useCart();
  const [mainImage, setMainImage] = useState(
    product?.image
  );
  const [zoomed, setZoomed] = useState(false);
  const imageRef = useRef(null);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, 1);
      onClose();
    }
  };

  if (!product) return null;

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;
    const { left, top, width, height } =
      imageRef.current.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    imageRef.current.style.transformOrigin = `${x}% ${y}%`;
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="minimal-modal">
        <IconButton className="close-btn" onClick={onClose}>
          <CloseIcon />
        </IconButton>

        <div className="wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-md-1 product">
                <div
                  className="row"
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  {/* Left: Image + Thumbnails */}
                  <div className="col-md-7">
                    <div className="product-image">
                      <div
                        className="image"
                        ref={imageRef}
                        style={{
                          backgroundImage: `url(${mainImage})`,
                          transform: zoomed ? "scale(2)" : "scale(1)",
                        }}
                        onMouseOver={() => setZoomed(true)}
                        onMouseOut={() => setZoomed(false)}
                        onMouseMove={handleMouseMove}
                      />
                    </div>

                    {product.thumbnails?.length > 0 && (
                      <div className="row product-thumbnails">
                        {product.thumbnails.map((thumb, idx) => (
                          <img
                            key={idx}
                            src={thumb}
                            alt={`thumb-${idx}`}
                            className="col-md-3"
                            onClick={() => setMainImage(thumb)}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Details */}
                  <div className="col-md-5" style={{ width: "500px" }}>
                    <div className="product-details">
                      <h2>{product.name}</h2>
                      <p>{product.description}</p>
                      <p className="price">
                        R {Number(product.price || 0).toFixed(0)}
                      </p>

                      <div className="modal-actions">
                        {product.customisable && (
                          <a href={`/studio`} className="action-btn">
                            Customize
                          </a>
                        )}
                        <button
                          onClick={handleAddToCart}
                          className="action-btn"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* End Details */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
