import React, { useState } from "react";
import "./CustomizePanel.css";

const CustomizePanel = ({ hoodieColor, setHoodieColor }) => {
  const [quantity, setQuantity] = useState(1);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="customize-panel">
      <div className="customize-panel-header">
        <h3>Customise Your Design</h3>
        <p>Select product, colors, and materials</p>
      </div>

      <div className="customize-panel-container">
        <div>
          <div className="customize-panel-content-header">
            <button className="toggle-button-products">
              {/* shirt icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shirt-svg"
              >
                <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
              </svg>
              Products
            </button>

            <button className="toggle-button-export">
              {/* export icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="export-svg"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Export
            </button>
          </div>

          <div className="customize-panel-content-body">
            <div className="item">
              <label htmlFor="model-type">Product</label>
              <button id="model-type" className="products-dropdown open">
                <span>
                  <div className="active-product">
                    <span className="product-name">Hoodie - R 400.00</span>
                    <span className="product-description">
                      Premium pullover hoodie with soft inner lining
                    </span>
                  </div>
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dropdown-icon"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>

            <div className="item mt-16">
              <label
                htmlFor="color-selection"
                className="color-selection-label"
              >
                {/* color palette icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="color-palette-svg"
                >
                  <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                  <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                  <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                  <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
                </svg>
                Color Selection
              </label>
              <div className="color-selection">
                <input
                  type="color"
                  value={hoodieColor}
                  name="color-selection"
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

            <div className="item mt-16">
              <label htmlFor="size-selection">Size</label>
              <button className="size-dropdown">
                <span>M</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="dropdown-icon"
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>

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

      <div className="panel-footer">
        <div className="panel-footer-left">
          <div className="panel-footer-price">R {400 * quantity}.00</div>
          <div className="panel-footer-item-count">
            {quantity} item{quantity > 1 ? "s" : ""} • Free shipping
          </div>
        </div>
        <button className="panel-footer-button">Add to Cart</button>
      </div>
    </div>
  );
};

export default CustomizePanel;
