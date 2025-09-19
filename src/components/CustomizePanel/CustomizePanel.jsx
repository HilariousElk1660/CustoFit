import React, { useState, useEffect } from "react";
import "./CustomizePanel.css";
import { products as productData } from "../../pages/Products/productData.jsx";
import { useCart } from "../../context/CartContext";
import ExportOptions from "../ExportOption/ExportOptions.jsx";
import UploadIcon from "../../assets/UploadFiles.gif";

const CustomizePanel = ({ hoodieColors, setHoodieColors }) => {
  const { addItem } = useCart();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [panelMode, setPanelMode] = useState("customize");

  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [showSizeDropdown, setShowSizeDropdown] = useState(false);

  const [materialPreset, setMaterialPreset] = useState("Basic");
  const [uploadedDesign, setUploadedDesign] = useState(null);
  const [activeView, setActiveView] = useState("Front");
  const [showViewModal, setShowViewModal] = useState(false);

  useEffect(() => {
    const filtered = productData.filter((p) => p.customisable);
    setProducts(filtered);
    if (filtered.length > 0) {
      setSelectedProduct(filtered[0]);
      setSize(filtered[0].sizes[0]);
    }
  }, []);

  const handleToggle = (mode) => {
    if (mode !== panelMode) setPanelMode(mode);
  };

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
      color: hoodieColors,
      quantity,
      image: selectedProduct.image,
      design: uploadedDesign,
      material: materialPreset,
    };

    addItem(item, quantity);
  };

  const handleDesignUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedDesign(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCopyToClipboard = () => {
    if (uploadedDesign) {
      navigator.clipboard.writeText(uploadedDesign);
    }
  };

  return (
    <div className="customize-panel">
      {/* Tabs */}
      <div className="customize-panel-content-header">
        <button
          className={`toggle-button ${
            panelMode === "customize" ? "active" : ""
          }`}
          onClick={() => handleToggle("customize")}
        >
          Customize
        </button>
        <button
          className={`toggle-button ${panelMode === "export" ? "active" : ""}`}
          onClick={() => handleToggle("export")}
        >
          Export
        </button>
      </div>

      {/* Panel Body */}
      <div className="customize-panel-body">
        {panelMode === "customize" ? (
          <>
            <div className="panel-view">
              <h3>Customise Your Hoodie</h3>
              <p>Select product, material, color, and upload your design</p>
            </div>

            <div className="customize-panel-container">
              <div className="customize-panel-content-body">
                {/* Product Selection */}
                <div className="item">
                  <label>Product</label>
                  <button
                    className={`products-dropdown ${
                      showProductDropdown ? "open" : ""
                    }`}
                    onClick={() => setShowProductDropdown((prev) => !prev)}
                  >
                    <span>
                      <div className="active-product">
                        <span className="product-name">
                          {selectedProduct?.name} - R {selectedProduct?.price}
                          .00
                        </span>
                        <span className="product-description-dropdown">
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

                {/* Material Tabs */}
                <div className="item mt-16">
                  <label>Material</label>
                  <div className="material-tabs">
                    {["Basic", "Metallic", "Clay"].map((preset) => (
                      <button
                        key={preset}
                        className={`material-tab ${
                          materialPreset === preset ? "active" : ""
                        }`}
                        onClick={() => setMaterialPreset(preset)}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Upload Trigger */}
                <div className="item mt-16">
                  <div
                    className="upload-trigger"
                    onClick={() => setShowViewModal(true)}
                  >
                    <span>Upload your design</span>
                    <span className="upload-icon grey">✏️</span>
                  </div>
                </div>

                {/* Color Selection */}
                <div className="item mt-16">
                  <label htmlFor="color-selection">Color Selection</label>
                  <div className="color-selection">
                    <div
                      className="color-labels"
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <label htmlFor="part1">Front</label>
                      <label htmlFor="part2">Back</label>
                      <label htmlFor="part3">Left</label>
                      <label htmlFor="part4">Right </label>
                    </div>
                    <div className="color-selection-inputs" style={{
                      display: "flex",
                      width: "100%",
                      alignItems: "center",
                      gap: "12px"
                    }}>
                      <input
                        type="color"
                        id="part1"
                        className="color-picker"
                        value={hoodieColors.part1}
                        onChange={(e) =>
                          setHoodieColors((prev) => ({
                            ...prev,
                            part1: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="color"
                        id="part2"
                        className="color-picker"
                        value={hoodieColors.part2}
                        onChange={(e) =>
                          setHoodieColors((prev) => ({
                            ...prev,
                            part2: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="color"
                        id="part3"
                        className="color-picker"
                        value={hoodieColors.part3}
                        onChange={(e) =>
                          setHoodieColors((prev) => ({
                            ...prev,
                            part3: e.target.value,
                          }))
                        }
                      />
                      <input
                        type="color"
                        id="part4"
                        className="color-picker"
                        value={hoodieColors.part4}
                        onChange={(e) =>
                          setHoodieColors((prev) => ({
                            ...prev,
                            part4: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Size Selection */}
                <div className="item mt-16">
                  <label>Size</label>
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
                  <label>Quantity</label>
                  <div className="mt-16">
                    <button className="button1" onClick={decrementQuantity}>
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      min="1"
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

            {/* Modal */}
            {showViewModal && (
              <div
                className="view-modal-overlay"
                onClick={() => setShowViewModal(false)}
              >
                <div
                  className="view-modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="view-tabs">
                    {["Front", "Back", "Left Sleeve", "Right Sleeve"].map(
                      (view) => (
                        <button
                          key={view}
                          className={`view-tab ${
                            activeView === view ? "active" : ""
                          }`}
                          onClick={() => setActiveView(view)}
                        >
                          {view}
                        </button>
                      )
                    )}
                  </div>

                  {!uploadedDesign ? (
                    <div
                      className="upload-zone"
                      onClick={() =>
                        document.getElementById("design-upload").click()
                      }
                    >
                      <div className="upload-icon">
                        <img src={UploadIcon} alt="Upload Icon" />
                      </div>
                      <span className="upload-text">
                        Upload your design here
                      </span>
                      <p className="upload-subtext">
                        Recommended resolution: 1920 × 1920 (1:1)
                      </p>

                      <input
                        type="file"
                        id="design-upload"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleDesignUpload}
                      />
                    </div>
                  ) : (
                    <div className="preview-wrapper">
                      <div className="preview-card">
                        <img
                          src={uploadedDesign}
                          alt="Uploaded Design"
                          className="preview-image"
                        />

                        <div className="preview-actions">
                          <button
                            onClick={handleCopyToClipboard}
                            className="preview-button"
                          >
                            📋 Copy
                          </button>
                          <button
                            onClick={() => setUploadedDesign(null)}
                            className="preview-button"
                          >
                            ❌ Remove
                          </button>
                        </div>

                        <div className="preview-footer">
                          <button
                            onClick={() => setShowViewModal(false)}
                            className="done-button"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* <div className="modal-footer">
                    <button
                      className="close-modal"
                      onClick={() => setShowViewModal(false)}
                    >
                      Done
                    </button>
                  </div> */}
                </div>
              </div>
            )}
          </>
        ) : (
          <ExportOptions uploadedDesign={uploadedDesign} />
        )}
      </div>
    </div>
  );
};

export default CustomizePanel;
