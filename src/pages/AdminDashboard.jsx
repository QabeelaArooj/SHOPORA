import { useState } from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [order, setOrder] = useState(() => {
    const savedOrder = JSON.parse(
      localStorage.getItem("order")
    );

    if (savedOrder) {
      return {
        ...savedOrder,
        status: savedOrder.status || "Pending",
      };
    }

    return null;
  });

  const updateStatus = (newStatus) => {
    if (!order) {
      return;
    }

    const updatedOrder = {
      ...order,
      status: newStatus,
    };

    // Save updated order
    localStorage.setItem(
      "order",
      JSON.stringify(updatedOrder)
    );

    // Update screen immediately
    setOrder(updatedOrder);

    alert(`Order status changed to ${newStatus}`);
  };

  return (
    <div className="admin-page">

      {/* HEADER */}

      <header className="admin-header">

        <div>
          <p className="admin-label">
            SHOPORA ADMIN
          </p>

          <h1>Dashboard</h1>
        </div>

        <Link
          to="/"
          className="admin-home-btn"
        >
          ← Back to Website
        </Link>

      </header>

      {/* STATS */}

      <div className="admin-stats">

        <div className="stat-card">
          <span>📦</span>

          <div>
            <p>Total Orders</p>
            <h2>{order ? 1 : 0}</h2>
          </div>
        </div>

        <div className="stat-card">
          <span>⏳</span>

          <div>
            <p>Pending</p>

            <h2>
              {order?.status === "Pending"
                ? 1
                : 0}
            </h2>
          </div>
        </div>

        <div className="stat-card">
          <span>🚚</span>

          <div>
            <p>Shipped</p>

            <h2>
              {order?.status === "Shipped"
                ? 1
                : 0}
            </h2>
          </div>
        </div>

        <div className="stat-card">
          <span>✅</span>

          <div>
            <p>Delivered</p>

            <h2>
              {order?.status === "Delivered"
                ? 1
                : 0}
            </h2>
          </div>
        </div>

      </div>

      {/* ORDERS */}

      <div className="orders-section">

        <div className="orders-header">
          <h2>Recent Orders</h2>
        </div>

        {!order ? (
          <div className="no-orders">

            <div>📦</div>

            <h3>No Orders Yet</h3>

            <p>
              Customer orders will appear here.
            </p>

          </div>
        ) : (

          <div className="order-card">

            {/* ORDER TOP */}

            <div className="order-top">

              <div>

                <span className="order-id">
                  {order.orderId || "SHOP-000000"}
                </span>

                <p>
                  {order.orderDate}
                </p>

              </div>

              <span
                className={`status ${
                  (order.status || "Pending").toLowerCase()
                }`}
              >
                {order.status || "Pending"}
              </span>

            </div>

            {/* CUSTOMER */}

            <div className="customer-info">

              <h3>
                Customer Information
              </h3>

              <p>
                <strong>Name:</strong>{" "}
                {order.customer?.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {order.customer?.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {order.customer?.phone}
              </p>

              <p>
                <strong>Address:</strong>{" "}
                {order.customer?.address},{" "}
                {order.customer?.city},{" "}
                {order.customer?.postalCode}
              </p>

              <p>
                <strong>Payment:</strong>{" "}
                {order.customer?.payment}
              </p>

            </div>

            {/* PRODUCTS */}

            <div className="admin-products">

              <h3>
                Ordered Products
              </h3>

              {order.products?.map((item) => (

                <div
                  className="admin-product"
                  key={item.id}
                >

                  <span>
                    {item.name}
                    {" × "}
                    {item.quantity || 1}
                  </span>

                  <strong>
                    $
                    {(
                      Number(item.price) *
                      (item.quantity || 1)
                    ).toFixed(2)}
                  </strong>

                </div>

              ))}

            </div>

            {/* TOTAL */}

            <div className="admin-total">

              <span>
                Total Amount
              </span>

              <strong>
                ${Number(order.total).toFixed(2)}
              </strong>

            </div>

            {/* UPDATE STATUS */}

            <div className="status-actions">

              <h3>
                Update Order Status
              </h3>

              <button
                type="button"
                onClick={() =>
                  updateStatus("Pending")
                }
              >
                Pending
              </button>

              <button
                type="button"
                onClick={() =>
                  updateStatus("Shipped")
                }
              >
                Shipped
              </button>

              <button
                type="button"
                onClick={() =>
                  updateStatus("Delivered")
                }
              >
                Delivered
              </button>

              <button
                type="button"
                onClick={() =>
                  updateStatus("Cancelled")
                }
              >
                Cancelled
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminDashboard;