import React, { useState, useEffect } from "react";
import "./CustomizePanel.css";
import { products as productData } from "../../pages/Products/productData.jsx";
import { useCart } from "../../context/CartContext"; // ✅ import your cart context

const CustomizePanel = ({ hoodieColor, setHoodieColor }) => {
  const { addItem } = useCart(); // ✅ get addItem from context

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);

  useEffect(() => {
    const filtered = productData.filter((p) => p.customisable);
    setProducts(filtered);
    if (filtered.length > 0) {
      setSelectedProduct(filtered[0]);
      setSize(filtered[0].sizes[0]);
    }
  }, []);

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!selectedProduct || !size) return;

    const item = {
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      description: selectedProduct.description,
      size,
      color: hoodieColor,
      quantity,
      image: selectedProduct.image, // ✅ include product image
    };

    addItem(item, quantity); // ✅ use CartContext to add to cart
  };

  return (
    <div className="customize-panel">
      {/* Header */}
      <div className="customize-panel-header">
        <h3>Customise Your Design</h3>
        <p>Select product, colors, and materials</p>
      </div>

      <div className="customize-panel-container">
        <div>
          {/* Tabs */}
          <div className="customize-panel-content-header">
            <button className="toggle-button-products">Products</button>
            <button className="toggle-button-export">Export</button>
          </div>

          {/* Body */}
          <div className="customize-panel-content-body">
            {/* Product Selection */}
            <div className="item">
              <label htmlFor="model-type">Product</label>
              <button
                id="model-type"
                className="products-dropdown open"
                onClick={() => setShowProductDropdown((prev) => !prev)}
              >
                <span>
                  <div className="active-product">
                    <span className="product-name">
                      {selectedProduct?.name} - R {selectedProduct?.price}.00
                    </span>
                    <span className="product-description">
                      {selectedProduct?.description}
                    </span>
                  </div>
                </span>
                <svg
                  className="dropdown-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {showProductDropdown && (
                <div className="dropdown-list">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="dropdown-item"
                      onClick={() => {
                        setSelectedProduct(product);
                        setSize(product.sizes[0]);
                        setShowProductDropdown(false);
                      }}
                    >
                      {product.name} - R {product.price}.00
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Color Picker */}
            <div className="item mt-16">
              <label htmlFor="color-selection">Color Selection</label>
              <div className="color-selection">
                <input
                  type="color"
                  value={hoodieColor}
                  id="color-selection"
                  className="color-picker"
                  onChange={(e) => setHoodieColor(e.target.value)}
                />
                <abbr title="Color Preview">
                  <div
                    className="color-preview"
                    style={{ backgroundColor: hoodieColor }}
                  ></div>
                </abbr>
              </div>
            </div>

            {/* Size Selection */}
            <div className="item mt-16">
              <label htmlFor="size-selection">Size</label>
              <button
                className="size-dropdown"
                onClick={() => setShowSizeDropdown((prev) => !prev)}
              >
                <span>{size}</span>
                <svg
                  className="dropdown-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {showSizeDropdown && (
                <div className="dropdown-list">
                  {selectedProduct?.sizes.map((s) => (
                    <div
                      key={s}
                      className="dropdown-item"
                      onClick={() => {
                        setSize(s);
                        setShowSizeDropdown(false);
                      }}
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quantity */}
            <div className="item mt-16">
              <label htmlFor="quantity">Quantity</label>
              <div className="mt-16">
                <button className="button1" onClick={decrementQuantity}>
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  min="1"
                  id="quantity"
                  className="quantity-input"
                  readOnly
                />
                <button className="button2" onClick={incrementQuantity}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="panel-footer">
        <div className="panel-footer-left">
          <div className="panel-footer-price">
            R {selectedProduct?.price * quantity}.00
          </div>
          <div className="panel-footer-item-count">
            {quantity} item{quantity > 1 ? "s" : ""} • Free shipping
          </div>
        </div>
        <button className="panel-footer-button" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default CustomizePanel;
