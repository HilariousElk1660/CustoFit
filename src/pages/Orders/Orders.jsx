import { useEffect, useState } from "react";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("orders");
    setOrders(stored ? JSON.parse(stored) : []);
  }, []);

  return (
    <div className="orders-container">
      <h1 className="orders-title">Your Orders</h1>

      {orders.length === 0 ? (
        <p className="no-orders-msg">No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <span className="order-id">Order #{order.id}</span>
                <span className="order-date">{order.date}</span>
                <span
                  className={`order-status ${
                    order.status?.toLowerCase() || "pending"
                  }`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              <div className="order-items">
                {order.items.map((item) => (
                  <div key={item.id || item.name} className="order-item">
                    <img
                      src={item.image || "/placeholder.jpg"}
                      alt={item.name || "Product"}
                      className="item-image"
                    />
                    <div className="item-details">
                      <p className="item-name">{item.name || "Unnamed Item"}</p>
                      <p className="item-qty">Qty: {item.quantity || 1}</p>
                      <p className="item-price">
                        R {item.price?.toFixed(0) || "0"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-total">
                <strong>Total:</strong> R {order.total?.toFixed(0) || "0"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
