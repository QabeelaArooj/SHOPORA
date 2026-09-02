import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import emailjs from "@emailjs/browser";


function AdminDashboard() {
  const navigate = useNavigate();

  // =========================
  // ADMIN LOGIN PROTECTION
  // =========================

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("adminLoggedIn");

    if (adminLoggedIn !== "true") {
      navigate("/admin-login");
    }
  }, [navigate]);

  // =========================
  // PRODUCTS STATES
  // =========================

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    category: "Fashion",
    image: "",
    description: "",
  });

  const [productMessage, setProductMessage] = useState("");
  const [addingProduct, setAddingProduct] = useState(false);

  // =========================
  // EDIT PRODUCT STATE
  // =========================

  const [editingProductId, setEditingProductId] = useState(null);

  // =========================
  // GET PRODUCTS
  // =========================

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/products"
      );

      if (!response.ok) {
        throw new Error("Failed to load products");
      }

      const data = await response.json();

      setProducts(data);
    } catch (error) {
      console.error("Products error:", error);

      setProductMessage(
        "Unable to load products. Make sure backend is running."
      );
    } finally {
      setProductsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =========================
  // PRODUCT INPUT
  // =========================

  const handleProductChange = (e) => {
    const { name, value } = e.target;

    setProductForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // ADD / UPDATE PRODUCT
  // =========================

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    try {
      setAddingProduct(true);
      setProductMessage("");

      const url = editingProductId
        ? `http://localhost:5000/api/products/${editingProductId}`
        : "http://localhost:5000/api/products";

      const method = editingProductId ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...productForm,
          price: Number(productForm.price),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save product"
        );
      }

      if (editingProductId) {
        setProductMessage(
          "Product updated successfully! ✅"
        );
      } else {
        setProductMessage(
          "Product added successfully! ✅"
        );
      }

      // Reset form
      setProductForm({
        name: "",
        price: "",
        category: "Fashion",
        image: "",
        description: "",
      });

      setEditingProductId(null);

      await fetchProducts();
    } catch (error) {
      console.error("Product save error:", error);

      setProductMessage(
        `Error: ${error.message}`
      );
    } finally {
      setAddingProduct(false);
    }
  };

  // =========================
  // EDIT PRODUCT
  // =========================

  const handleEditProduct = (product) => {
    setEditingProductId(product._id);

    setProductForm({
      name: product.name,
      price: product.price,
      category: product.category,
      image: product.image,
      description: product.description || "",
    });

    setProductMessage("");

    window.scrollTo({
      top: 250,
      behavior: "smooth",
    });
  };

  // =========================
  // CANCEL EDIT
  // =========================

  const handleCancelEdit = () => {
    setEditingProductId(null);

    setProductForm({
      name: "",
      price: "",
      category: "Fashion",
      image: "",
      description: "",
    });

    setProductMessage("");
  };

  // =========================
  // DELETE PRODUCT
  // =========================

  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete product"
        );
      }

      alert("Product deleted successfully! ✅");

      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) => product._id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );

      alert(`Error: ${error.message}`);
    }
  };

  // =========================
  // GET ORDER
  // =========================

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

  // =========================
  // UPDATE ORDER STATUS
  // =========================

const updateStatus = async (newStatus) => {
  if (!order) {
    return;
  }

  try {
    const updatedOrder = {
      ...order,
      status: newStatus,
    };

    // Save updated order
    localStorage.setItem(
      "order",
      JSON.stringify(updatedOrder)
    );

    // Update dashboard
    setOrder(updatedOrder);

    // Send status email to customer
    await emailjs.send(
      "service_zyr2ijs",
      "template_4hxhmt7",
      {
        order_id:
          updatedOrder.orderId || "SHOP-000000",

        customer_name:
          updatedOrder.customer?.name || "Customer",

        customer_email:
          updatedOrder.customer?.email || "",

        status: newStatus,

        total: Number(
          updatedOrder.total || 0
        ).toFixed(2),

        order_date:
          updatedOrder.orderDate || "",
      },
      "zmFhMks2xbIbwqC5o"
    );

    alert(
      `Order status changed to ${newStatus} and customer has been notified! 📧`
    );

  } catch (error) {
    console.error(
      "Status email error:",
      error
    );

    alert(
      `Status changed to ${newStatus}, but customer email could not be sent.`
    );
  }
  }

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");

    alert(
      "Admin logged out successfully!"
    );

    navigate("/admin-login");
  };

  // =========================
  // PAGE
  // =========================

  return (
    <div className="admin-page">

      {/* =========================
          HEADER
      ========================== */}

      <header className="admin-header">

        <div>
          <p className="admin-label">
            SHOPORA ADMIN
          </p>

          <h1>
            Dashboard
          </h1>
        </div>

        <div className="admin-header-buttons">

          <Link
            to="/"
            className="admin-home-btn"
          >
            ← Back to Website
          </Link>

          <button
            type="button"
            className="admin-logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>

      {/* =========================
          STATISTICS
      ========================== */}

      <div className="admin-stats">

        <div className="stat-card">
          <span>📦</span>

          <div>
            <p>Total Orders</p>

            <h2>
              {order ? 1 : 0}
            </h2>
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

      {/* =========================
          ADD / EDIT PRODUCT
      ========================== */}

      <section className="add-product-section">

        <h2>
          {editingProductId
            ? "Edit Product"
            : "Add New Product"}
        </h2>

        <form
          className="add-product-form"
          onSubmit={handleProductSubmit}
        >

          {/* PRODUCT NAME */}

          <div className="form-group">

            <label>
              Product Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter product name"
              value={productForm.name}
              onChange={handleProductChange}
              required
            />

          </div>

          {/* PRICE */}

          <div className="form-group">

            <label>
              Price
            </label>

            <input
              type="number"
              name="price"
              placeholder="Enter price"
              min="0"
              step="0.01"
              value={productForm.price}
              onChange={handleProductChange}
              required
            />

          </div>

          {/* CATEGORY */}

          <div className="form-group">

            <label>
              Category
            </label>

            <select
              name="category"
              value={productForm.category}
              onChange={handleProductChange}
            >

              <option value="Fashion">
                Fashion
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Home & Kitchen">
                Home & Kitchen
              </option>

              <option value="Beauty">
                Beauty
              </option>

              <option value="Kids">
                Kids
              </option>

              <option value="Grocery">
                Grocery
              </option>

            </select>

          </div>

          {/* IMAGE URL */}

          <div className="form-group">

            <label>
              Image URL
            </label>

            <input
              type="url"
              name="image"
              placeholder="Enter image URL"
              value={productForm.image}
              onChange={handleProductChange}
              required
            />

          </div>

          {/* DESCRIPTION */}

          <div className="form-group">

            <label>
              Description
            </label>

            <textarea
              name="description"
              placeholder="Enter product description"
              rows="4"
              value={productForm.description}
              onChange={handleProductChange}
            />

          </div>

          {/* BUTTONS */}

          <div className="product-form-buttons">

            <button
              type="submit"
              className="add-product-btn"
              disabled={addingProduct}
            >

              {addingProduct
                ? "Saving..."
                : editingProductId
                ? "Update Product"
                : "Add Product"}

            </button>

            {editingProductId && (
              <button
                type="button"
                className="cancel-edit-btn"
                onClick={handleCancelEdit}
              >
                Cancel
              </button>
            )}

          </div>

        </form>

        {productMessage && (
          <p className="product-message">
            {productMessage}
          </p>
        )}

      </section>

      {/* =========================
          MANAGE PRODUCTS
      ========================== */}

      <section className="admin-products-section">

        <div className="orders-header">

          <h2>
            Manage Products
          </h2>

        </div>

        {productsLoading ? (

          <div className="no-orders">

            <h3>
              Loading products...
            </h3>

          </div>

        ) : products.length === 0 ? (

          <div className="no-orders">

            <h3>
              No Products Found
            </h3>

          </div>

        ) : (

          <div className="admin-product-list">

            {products.map((product) => (

              <div
                className="admin-manage-product"
                key={product._id}
              >

                <img
                  src={product.image}
                  alt={product.name}
                />

                <div className="manage-product-info">

                  <h3>
                    {product.name}
                  </h3>

                  <p>
                    {product.category}
                  </p>

                  <strong>
                    $
                    {Number(
                      product.price
                    ).toFixed(2)}
                  </strong>

                  <small>
                    {product.description}
                  </small>

                </div>

                <div className="product-actions">

                  <button
                    type="button"
                    className="edit-product-btn"
                    onClick={() =>
                      handleEditProduct(product)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="delete-product-btn"
                    onClick={() =>
                      handleDeleteProduct(
                        product._id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

      {/* =========================
          ORDERS
      ========================== */}

      <section className="orders-section">

        <div className="orders-header">

          <h2>
            Recent Orders
          </h2>

        </div>

        {!order ? (

          <div className="no-orders">

            <div>
              📦
            </div>

            <h3>
              No Orders Yet
            </h3>

            <p>
              Customer orders will
              appear here.
            </p>

          </div>

        ) : (

          <div className="order-card">

            {/* ORDER TOP */}

            <div className="order-top">

              <div>

                <span className="order-id">

                  {order.orderId ||
                    "SHOP-000000"}

                </span>

                <p>
                  {order.orderDate}
                </p>

              </div>

              <span
                className={`status ${
                  (
                    order.status ||
                    "Pending"
                  ).toLowerCase()
                }`}
              >
                {order.status ||
                  "Pending"}
              </span>

            </div>

            {/* CUSTOMER INFORMATION */}

            <div className="customer-info">

              <h3>
                Customer Information
              </h3>

              <p>
                <strong>
                  Name:
                </strong>{" "}
                {order.customer?.name}
              </p>

              <p>
                <strong>
                  Email:
                </strong>{" "}
                {order.customer?.email}
              </p>

              <p>
                <strong>
                  Phone:
                </strong>{" "}
                {order.customer?.phone}
              </p>

              <p>
                <strong>
                  Address:
                </strong>{" "}
                {order.customer?.address},{" "}
                {order.customer?.city},{" "}
                {order.customer?.postalCode}
              </p>

              <p>
                <strong>
                  Payment:
                </strong>{" "}
                {order.customer?.payment}
              </p>

            </div>

            {/* ORDERED PRODUCTS */}

            <div className="admin-products">

              <h3>
                Ordered Products
              </h3>

              {order.products?.map(
                (item, index) => (

                  <div
                    className="admin-product"
                    key={
                      item.id || index
                    }
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

                )
              )}

            </div>

            {/* TOTAL */}

            <div className="admin-total">

              <span>
                Total Amount
              </span>

              <strong>

                $
                {Number(
                  order.total || 0
                ).toFixed(2)}

              </strong>

            </div>

            {/* STATUS */}

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

      </section>

    </div>
  );
}

export default AdminDashboard;