import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    payment: "Cash on Delivery",
  });

  // Get cart from localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * (item.quantity || 1),
    0
  );

  // Delivery charges
  const delivery = subtotal > 0 ? 200 : 0;

  // Final total
  const total = subtotal + delivery;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Place order
  const handleOrder = (e) => {
    e.preventDefault();

    // Check cart
    if (cart.length === 0) {
      alert("Your cart is empty!");
      navigate("/products");
      return;
    }

    // Create order
    const order = {
      orderId:
        "SHOP-" + Math.floor(100000 + Math.random() * 900000),

      customer: formData,

      products: cart,

      subtotal: subtotal,

      delivery: delivery,

      total: total,

      orderDate: new Date().toLocaleString(),

      status: "Pending",
    };

    // Save order
    localStorage.setItem(
      "order",
      JSON.stringify(order)
    );

    // Empty cart
    localStorage.removeItem("cart");

    // Update Navbar cart count
    window.dispatchEvent(
      new Event("cartUpdated")
    );

    // Success message
    alert("Order placed successfully!");

    // Go to confirmation page
    navigate("/order-confirmation");
  };

  return (
    <div className="checkout-page">

      <div className="checkout-container">

        {/* =========================
            CHECKOUT FORM
        ========================== */}

        <div className="checkout-form">

          <h1>Checkout</h1>

          <p>
            Complete your information to place your order.
          </p>

          <form onSubmit={handleOrder}>

            {/* CUSTOMER INFORMATION */}

            <h2>Customer Information</h2>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            {/* DELIVERY ADDRESS */}

            <h2>Delivery Address</h2>

            <input
              type="text"
              name="address"
              placeholder="Complete Address"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />

            {/* PAYMENT */}

            <h2>Payment Method</h2>

            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
            >
              <option value="Cash on Delivery">
                Cash on Delivery
              </option>

              <option value="Credit / Debit Card">
                Credit / Debit Card
              </option>

              <option value="Online Payment">
                Online Payment
              </option>
            </select>

            {/* PLACE ORDER */}

            <button type="submit">
              Place Order
            </button>

          </form>

        </div>

        {/* =========================
            ORDER SUMMARY
        ========================== */}

        <div className="order-summary">

          <h2>Order Summary</h2>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                className="summary-item"
                key={item.id}
              >

                <span>
                  {item.name} × {item.quantity || 1}
                </span>

                <span>
                  $
                  {(
                    Number(item.price) *
                    (item.quantity || 1)
                  ).toFixed(2)}
                </span>

              </div>
            ))
          )}

          <hr />

          {/* SUBTOTAL */}

          <div className="summary-row">

            <span>
              Subtotal
            </span>

            <strong>
              ${subtotal.toFixed(2)}
            </strong>

          </div>

          {/* DELIVERY */}

          <div className="summary-row">

            <span>
              Delivery
            </span>

            <span>
              Rs. {delivery}
            </span>

          </div>

          {/* TOTAL */}

          <div className="summary-total">

            <span>
              Total
            </span>

            <strong>
              ${total.toFixed(2)}
            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;