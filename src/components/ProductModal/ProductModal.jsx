import React, { useState, useRef, useEffect } from "react";
import { useCart } from "../../context/CartContext";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "./ProductModal.css";

export default function ProductModal({ open, onClose, product }) {
  const { addItem } = useCart();
  const [mainImage, setMainImage] = useState(product?.image);
  const [zoomed, setZoomed] = useState(false);
  const imageContainerRef = useRef(null);
  const imageRef = useRef(null);

  // Update main image when product changes
  useEffect(() => {
    if (product?.image) {
      setMainImage(product.image);
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, 1);
      onClose();
    }
  };

  if (!product) return null;

  const handleMouseMove = (e) => {
    if (!imageRef.current || !imageContainerRef.current) return;
    
    const container = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - container.left) / container.width) * 100;
    const y = ((e.clientY - container.top) / container.height) * 100;
    
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
                  style={{ display: "flex", padding: "0 25px 10px", justifyContent: "space-between", alignItems: "flex-start" }}
                >
                  {/* Left: Image + Thumbnails */}
                  <div className="col-md-7" style={{ flex: "1 1 auto", minWidth: "300px", maxWidth: "60%" }}>
                    <div 
                      className="product-image"
                      ref={imageContainerRef}
                      onMouseOver={() => setZoomed(true)}
                      onMouseOut={() => setZoomed(false)}
                      onMouseMove={handleMouseMove}
                    >
                      <img
                        ref={imageRef}
                        src={mainImage}
                        alt={product.name}
                        className="main-product-image"
                        style={{
                          transform: zoomed ? "scale(2)" : "scale(1)",
                          transition: zoomed ? "none" : "transform 0.3s ease",
                        }}
                      />
                    </div>

                    {product.thumbnails?.length > 0 && (
                      <div className="row product-thumbnails">
                        {product.thumbnails.map((thumb, idx) => (
                          <img
                            key={idx}
                            src={thumb}
                            alt={`thumb-${idx}`}
                            className="col-md-3 thumbnail-img"
                            onMouseEnter={() => setMainImage(thumb)}
                            onClick={() => setMainImage(thumb)}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right: Details */}
                  <div className="col-md-5" style={{ flex: "0 1 400px", minWidth: "300px", marginLeft: "30px" }}>
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