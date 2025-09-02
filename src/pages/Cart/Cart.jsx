import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
    ShoppingCart,
    Plus,
    Minus,
    Trash2,
    ArrowLeft,
    CreditCard,
} from "lucide-react";
import { useCart } from "../../context/CartContext.jsx";
import "./Cart.css";

function Cart({ onCheckout }) {
    const { cartItems, updateQuantity, removeItem, clearCart } = useCart();
    const [couponCode, setCouponCode] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState("");

    const availableCoupons = {
        SAVE10: { discount: 0.1, type: "percentage" },
        WELCOME20: { discount: 0.2, type: "percentage" },
        FREESHIP: { discount: 9.99, type: "fixed" },
        SAVE5: { discount: 5, type: "fixed" },
        OBI: { discount: 100, type: "secret" },
    };

    const applyCoupon = () => {
        const c = availableCoupons[couponCode.toUpperCase()];
        if (c) {
            setAppliedCoupon({ code: couponCode.toUpperCase(), ...c });
            setCouponError("");
            setCouponCode("");
        } else {
            setCouponError("Invalid coupon code");
            setAppliedCoupon(null);
        }
    };

    const removeCoupon = () => {
        setAppliedCoupon(null);
        setCouponError("");
    };

    const subtotal = cartItems.reduce(
        (sum, i) => sum + i.price * i.quantity,
        0
    );
    const tax = subtotal * 0.08;
    let shipping = subtotal > 50 ? 0 : 9.99;
    let discount = 0;

    if (appliedCoupon) {
        if (appliedCoupon.type === "percentage") {
            discount = subtotal * appliedCoupon.discount;
        } else if (appliedCoupon.type === "secret") {
            discount = subtotal;
        } else {
            if (appliedCoupon.code === "FREESHIP") {
                shipping = 0;
            } else {
                discount = appliedCoupon.discount;
            }
        }
    }

    const total = Math.max(0, subtotal + tax + shipping - discount);

    if (cartItems.length === 0) {
        return (
            <>
                <div className="cart-container">
                    <div className="empty-cart">
                        <ShoppingCart size={64} className="empty-cart-icon" />
                        <h2>Your cart is empty</h2>
                        <p>Add some items to get started!</p>
                        <button className="continue-shopping-btn">
                            <Link to="/products">Continue Shopping</Link>
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="cart-container">
                <div className="cart-content">
                    <div className="cart-header">
                        <button className="back-btn">
                            <ArrowLeft size={20} />
                            <Link to="/products">Continue Shopping</Link>
                        </button>
                        <h1 className="cart-title">
                            <ShoppingCart size={28} />
                            Shopping Cart ({cartItems.length} items)
                        </h1>
                    </div>

                    <div className="cart-layout">
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className="item-image">
                                        <img src={item.image} alt={item.name} />
                                    </div>

                                    <div className="item-details">
                                        <h3 className="item-name">{item.name}</h3>
                                        <div className="item-specs">
                                            <span>Color: {item.color}</span>
                                            <span>Size: {item.size}</span>
                                        </div>
                                        <div className="item-price">
                                            R {item.price.toFixed(2)}
                                        </div>
                                    </div>

                                    <div className="item-controls">
                                        <div className="quantity-controls">
                                            <button
                                                className="quantity-btn"
                                                onClick={() =>
                                                    updateQuantity(item.id, item.quantity - 1)
                                                }
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="quantity">{item.quantity}</span>
                                            <button
                                                className="quantity-btn"
                                                onClick={() =>
                                                    updateQuantity(item.id, item.quantity + 1)
                                                }
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>

                                        <button
                                            className="remove-btn"
                                            onClick={() => removeItem(item.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    <div className="item-total">
                                        R {(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="order-summary">
                            <h3>Order Summary</h3>

                            <div className="summary-line">
                                <span>Subtotal</span>
                                <span>R {subtotal.toFixed(2)}</span>
                            </div>

                            <div className="summary-line">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? "FREE" : `R ${shipping.toFixed(2)}`}</span>
                            </div>

                            <div className="summary-line">
                                <span>Tax</span>
                                <span>R {tax.toFixed(2)}</span>
                            </div>

                            {appliedCoupon && (
                                <div className="summary-line coupon-applied">
                                    <span>
                                        Coupon ({appliedCoupon.code})
                                        <button
                                            className="remove-coupon-btn"
                                            onClick={removeCoupon}
                                        >
                                            ×
                                        </button>
                                    </span>
                                    <span>-R {discount.toFixed(2)}</span>
                                </div>
                            )}

                            <div className="coupon-section">
                                <div className="coupon-input-group">
                                    <input
                                        type="text"
                                        placeholder="Enter coupon code"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        className="coupon-input"
                                        onKeyPress={(e) =>
                                            e.key === "Enter" && applyCoupon()
                                        }
                                    />
                                    <button
                                        onClick={applyCoupon}
                                        className="apply-coupon-btn"
                                    >
                                        Apply
                                    </button>
                                </div>
                                {couponError && (
                                    <div className="coupon-error">{couponError}</div>
                                )}
                                <div className="coupon-suggestions">
                                    Try: SAVE10, WELCOME20, FREESHIP, SAVE5
                                </div>
                            </div>

                            <div className="summary-divider" />

                            <div className="summary-line total">
                                <span>Total</span>
                                <span>R {total.toFixed(2)}</span>
                            </div>

                            {shipping > 0 && (
                                <div className="shipping-notice">
                                    Add R {(50 - subtotal).toFixed(2)} more for free
                                    shipping!
                                </div>
                            )}

                            <button
                                className="checkout-btn"
                                onClick={() =>
                                    onCheckout && onCheckout(cartItems, total)
                                }
                            >
                                <CreditCard size={20} />
                                <Link to="/checkout">Proceed to Checkout</Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cart;
