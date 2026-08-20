import { Link } from "react-router-dom";
import "./OrderConfirmation.css";

function OrderConfirmation() {
  const order = JSON.parse(localStorage.getItem("order"));

  if (!order) {
    return (
      <div className="confirmation-page">
        <div className="confirmation-box">
          <h1>No Order Found</h1>
          <Link to="/products">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  const orderId = "SHOP-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="confirmation-page">
      <div className="confirmation-box">

        <div className="success-icon">
          ✓
        </div>

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for shopping with SHOPORA.
        </p>

        <div className="order-info">
          <p>
            <strong>Order ID:</strong> {orderId}
          </p>

          <p>
            <strong>Customer:</strong> {order.customer.name}
          </p>

          <p>
            <strong>Email:</strong> {order.customer.email}
          </p>

          <p>
            <strong>Payment:</strong> {order.customer.payment}
          </p>

          <p>
            <strong>Total:</strong> Rs. {order.total}
          </p>
        </div>

        <div className="confirmation-buttons">
          <Link to="/products" className="shop-btn">
            Continue Shopping
          </Link>

          <Link to="/" className="home-btn">
            Back to Home
          </Link>
        </div>

      </div>
    </div>
  );
}

export default OrderConfirmation;