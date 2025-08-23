import React, { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext.jsx";
import {
  CheckCircle,
  ArrowLeft,
  User,
  MapPin,
  Truck,
  CreditCard,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems } = useCart();
  const { clearCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",

    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",

    shippingMethod: "standard",
    saveInfo: false,
    newsletter: false,
  });

  const [errors, setErrors] = useState({});

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shipping =
    formData.shippingMethod == "express"
      ? 13.99
      : formData.shippingMethod == "overnight"
      ? 24.99
      : 0;
  const total = subtotal + tax + shipping;

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.address) newErrors.address = "Street Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zipCode) newErrors.zipCode = "ZIP Code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = () => {
    if (validateStep1()) {
      setCurrentStep(2);
    }
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.cardNumber) newErrors.cardNumber = "Card Number is required";
    if (!formData.expiryDate) newErrors.expiryDate = "Expiry Date is required";
    if (!formData.cvv) newErrors.cvv = "CVV is required";
    if (!formData.cardName) newErrors.cardName = "Cardholder Name is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (validateStep2()) {
      setTimeout(() => setShowSuccess(true), 800);
    }
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, "");
    const formatted = digits.match(/.{1,4}/g)?.join(" ") || "";
    return formatted;
  };

  const formatExpiryDate = (value) => {
    const digits = value.replace(/D/g, "");
    if (digits.length === 2) {
      return digits.substring(0, 2) + "/" + digits.substring(2, 4);
    }
    return digits;
  };

  useEffect(() => {
    if (showSuccess) {
      const orderData = {
        id: "ABC123XYZ",
        date: new Date().toLocaleString(),
        items: cartItems,
        total: cartItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };

      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      localStorage.setItem(
        "orders",
        JSON.stringify([...existingOrders, orderData])
      );
    }
  }, [showSuccess]);

  useEffect(() => {
    if (showSuccess) {
      clearCart();
    }
  }, [showSuccess]);

  if (showSuccess) {
    return (
      <>
        <div className="checkout-container">
          <div className="success-page">
            <CheckCircle className="success-icon" color="#28a745" />
            <h1>Order Placed Successfully!</h1>
            <p>
              Thank you for shopping with us. Your order has been confirmed.
            </p>
            <div className="order-number">Order #ABC123XYZ</div>
            <Link to="/products">
              <button className="continue-btn">Continue Shopping</button>
            </Link>
            <Link to="/orders">
              <button className="view-orders-btn">My Orders</button>
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="checkout-container">
        <div className="checkout-content">
          <div className="checkout-header">
            {/* <Link to="/cart"> */}
            <button type="button" className="back-btn">
              <ArrowLeft size={20} />
              Back
            </button>
            {/* </Link> */}
          </div>

          <div className="progress-steps">
            <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
              <div className="step-number">1</div>
              <span>Shipping</span>
            </div>
            <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
              <div className="step-number">2</div>
              <span>Payment</span>
            </div>
            <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
              <div className="step-number">3</div>
              <span>Confirmation</span>
            </div>
          </div>

          <div className="checkout-layout">
            <div className="checkout-form">
              {currentStep === 1 && (
                <form
                  className="checkout-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="form-section">
                    <h3>
                      <User size={20} />
                      Contact Information
                    </h3>

                    <div className="form-row">
                      <div className="form-group">
                        <label>First Name *</label>
                        <input
                          type="text"
                          id="sml-width"
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          className={errors.firstName ? "error" : ""}
                        />
                        {errors.firstName && (
                          <span className="error-text">{errors.firstName}</span>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Last Name *</label>
                        <input
                          type="text"
                          id="sml-width"
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          className={errors.lastName ? "error" : ""}
                        />
                        {errors.lastName && (
                          <span className="error-text">{errors.lastName}</span>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        id="lrg-width"
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={errors.email ? "error" : ""}
                      />
                      {errors.email && (
                        <span className="error-text">{errors.email}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        id="lrg-width"
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>
                      <MapPin size={20} />
                      Shipping Address
                    </h3>

                    <div className="form-group">
                      <label>Street Address *</label>
                      <input
                        type="text"
                        id="lrg-width"
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        className={errors.address ? "error" : ""}
                      />
                      {errors.address && (
                        <span className="error-text">{errors.address}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Apartment, suite, etc.</label>
                      <input
                        type="text"
                        id="lrg-width"
                        onChange={(e) =>
                          handleInputChange("apartment", e.target.value)
                        }
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>City *</label>
                        <input
                          type="text"
                          id="sml-width"
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          className={errors.city ? "error" : ""}
                        />
                        {errors.city && (
                          <span className="error-text">{errors.city}</span>
                        )}
                      </div>
                      <div className="form-group">
                        <label>State *</label>
                        <select
                          id="sml-width"
                          onChange={(e) =>
                            handleInputChange("state", e.target.value)
                          }
                          className={errors.state ? "error" : ""}
                        >
                          <option value="">Select State</option>
                          <option value="CA">California</option>
                          <option value="NY">New York</option>
                          <option value="TX">Texas</option>
                          <option value="FL">Florida</option>
                        </select>
                        {errors.state && (
                          <span className="error-text">{errors.state}</span>
                        )}
                      </div>
                      <div className="form-group">
                        <label>ZIP Code *</label>
                        <input
                          type="text"
                          id="sml-width"
                          onChange={(e) =>
                            handleInputChange("zipCode", e.target.value)
                          }
                          className={errors.zipCode ? "error" : ""}
                        />
                        {errors.zipCode && (
                          <span className="error-text">{errors.zipCode}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="form-section">
                    <h3>
                      <Truck size={20} />
                      Shipping Method
                    </h3>

                    <div className="shipping-options">
                      <label className="shipping-option">
                        <input
                          type="radio"
                          name="shipping"
                          value="standard"
                          checked={formData.shippingMethod === "standard"}
                          onChange={(e) =>
                            handleInputChange("shippingMethod", e.target.value)
                          }
                        />
                        <div className="shipping-details">
                          <div className="shipping-name">Standard Shipping</div>
                          <div className="shipping-time">5-7 business days</div>
                        </div>
                        <div className="shipping-price">Free</div>
                      </label>

                      <label className="shipping-option">
                        <input
                          type="radio"
                          name="shipping"
                          value="express"
                          checked={formData.shippingMethod === "express"}
                          onChange={(e) =>
                            handleInputChange("shippingMethod", e.target.value)
                          }
                        />
                        <div className="shipping-details">
                          <div className="shipping-name">Express Shipping</div>
                          <div className="shipping-time">2-3 business days</div>
                        </div>
                        <div className="shipping-price">R 13.99</div>
                      </label>

                      <label className="shipping-option">
                        <input
                          type="radio"
                          name="shipping"
                          value="overnight"
                          checked={formData.shippingMethod === "overnight"}
                          onChange={(e) =>
                            handleInputChange("shippingMethod", e.target.value)
                          }
                        />
                        <div className="shipping-details">
                          <div className="shipping-name">
                            Overnight Shipping
                          </div>
                          <div className="shipping-time">Next business day</div>
                        </div>
                        <div className="shipping-price">R 24.99</div>
                      </label>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="continue-btn"
                    onClick={handleContinueToPayment}
                  >
                    Continue to Payment
                  </button>
                </form>
              )}

              {currentStep === 2 && (
                <form
                  className="checkout-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handlePlaceOrder();
                  }}
                >
                  <div className="form-section">
                    <h3>
                      <CreditCard size={20} />
                      Payment Information
                    </h3>

                    <div className="form-group">
                      <label>Card Number *</label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) =>
                          handleInputChange(
                            "cardNumber",
                            formatCardNumber(e.target.value)
                          )
                        }
                        placeholder="1234 5678 9012 3456"
                        maxLength="19"
                        className={errors.cardNumber ? "error" : ""}
                      />
                      {errors.cardNumber && (
                        <span className="error-text">{errors.cardNumber}</span>
                      )}
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date *</label>
                        <input
                          type="text"
                          value={formData.expiryDate}
                          onChange={(e) =>
                            handleInputChange(
                              "expiryDate",
                              formatExpiryDate(e.target.value)
                            )
                          }
                          placeholder="MM/YY"
                          maxLength="5"
                          className={errors.expiryDate ? "error" : ""}
                        />
                        {errors.expiryDate && (
                          <span className="error-text">
                            {errors.expiryDate}
                          </span>
                        )}
                      </div>
                      <div className="form-group">
                        <label>CVV *</label>
                        <input
                          type="text"
                          value={formData.cvv}
                          onChange={(e) =>
                            handleInputChange(
                              "cvv",
                              e.target.value.replace(/D/g, "").substring(0, 4)
                            )
                          }
                          placeholder="123"
                          maxLength="3"
                          className={errors.cvv ? "error" : ""}
                        />
                        {errors.cvv && (
                          <span className="error-text">{errors.cvv}</span>
                        )}
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="cardName">Cardholder Name *</label>
                      <input
                        id="cardName"
                        type="text"
                        value={formData.cardName}
                        onChange={(e) =>
                          handleInputChange("cardName", e.target.value)
                        }
                        className={`form-control ${
                          errors.cardName ? "error" : ""
                        }`}
                        autoComplete="cc-name"
                      />
                      {errors.cardName && (
                        <span className="error-text">{errors.cardName}</span>
                      )}
                    </div>
                  </div>

                  <div className="form-section">
                    <div className="checkbox-group">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.saveInfo}
                          onChange={(e) =>
                            handleInputChange("saveInfo", e.target.checked)
                          }
                        />
                        Save my information for faster checkout
                      </label>

                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.newsletter}
                          onChange={(e) =>
                            handleInputChange("newsletter", e.target.checked)
                          }
                        />
                        Subscribe to our newsletter for exclusive offers
                      </label>
                    </div>
                  </div>

                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="back-step-btn"
                    >
                      Back to Shipping
                    </button>
                    <button
                      type="submit"
                      className="place-order-btn"
                      disabled={showSuccess}
                    >
                      {showSuccess
                        ? "Processing..."
                        : `Place Order - R ${total.toFixed(2)}`}
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="order-summary-checkout">
              <h3>Order Summary</h3>
              <div className="order-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="order-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-details">Qty: {item.quantity}</div>
                    </div>
                    <div className="item-price">
                      R{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-totals">
                <div className="total-line">
                  <span>Subtotal</span>
                  <span>R {subtotal.toFixed(2)}</span>
                </div>
                <div className="total-line">
                  <span>Tax</span>
                  <span>R {tax.toFixed(2)}</span>
                </div>
                <div className="total-line">
                  <span>Shipping</span>
                  <span>R {shipping.toFixed(2)}</span>
                </div>
                <div className="total-line total">
                  <span>Total</span>
                  <span>R {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
