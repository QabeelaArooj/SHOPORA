const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");
const Order = require("./models/Order");

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(cors());
app.use(express.json());

// =========================
// MONGODB CONNECTION
// =========================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.log(
      "MongoDB Connection Error:",
      error.message
    );
  });

// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "SHOPORA Backend is running!",
  });
});

// =====================================================
// PRODUCTS
// =====================================================

// GET ALL PRODUCTS

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ADD PRODUCT

app.post("/api/products", async (req, res) => {
  try {
    const product = new Product({
      ...req.body,
      price: Number(req.body.price),
    });

    const savedProduct = await product.save();

    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE PRODUCT

app.delete(
  "/api/products/:id",
  async (req, res) => {
    try {
      const deletedProduct =
        await Product.findByIdAndDelete(
          req.params.id
        );

      if (!deletedProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json({
        message:
          "Product deleted successfully!",
        product: deletedProduct,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// UPDATE PRODUCT

app.put(
  "/api/products/:id",
  async (req, res) => {
    try {
      const updatedProduct =
        await Product.findByIdAndUpdate(
          req.params.id,
          {
            ...req.body,
            price: Number(req.body.price),
          },
          {
            new: true,
            runValidators: true,
          }
        );

      if (!updatedProduct) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json({
        message:
          "Product updated successfully!",
        product: updatedProduct,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
);

// =====================================================
// ORDERS
// =====================================================

// CREATE ORDER

app.post("/api/orders", async (req, res) => {
  try {
    const {
      orderId,
      customer,
      products,
      subtotal,
      delivery,
      total,
      orderDate,
      status,
    } = req.body;

    // Basic validation

    if (!customer) {
      return res.status(400).json({
        message: "Customer information is required.",
      });
    }

    if (
      !customer.name ||
      !customer.email ||
      !customer.phone ||
      !customer.address ||
      !customer.city ||
      !customer.postalCode
    ) {
      return res.status(400).json({
        message:
          "Please complete all customer information.",
      });
    }

    if (!products || products.length === 0) {
      return res.status(400).json({
        message: "Order must contain products.",
      });
    }

    // Create order

    const order = new Order({
      orderId,
      customer,
      products,
      subtotal: Number(subtotal),
      delivery: Number(delivery),
      total: Number(total),
      orderDate,
      status: status || "Pending",
    });

    const savedOrder = await order.save();

    console.log(
      "New order received:",
      savedOrder.orderId
    );

    res.status(201).json({
      message: "Order placed successfully!",
      order: savedOrder,
    });
  } catch (error) {
    console.error(
      "Create order error:",
      error
    );

    res.status(500).json({
      message: error.message,
    });
  }
});

// GET ALL ORDERS

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// GET SINGLE ORDER

app.get(
  "/api/orders/:id",
  async (req, res) => {
    try {
      const order =
        await Order.findById(req.params.id);

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// UPDATE ORDER STATUS

app.put(
  "/api/orders/:id/status",
  async (req, res) => {
    try {
      const { status } = req.body;

      const allowedStatuses = [
        "Pending",
        "Shipped",
        "Delivered",
        "Cancelled",
      ];

      if (
        !allowedStatuses.includes(status)
      ) {
        return res.status(400).json({
          message: "Invalid order status.",
        });
      }

      const updatedOrder =
        await Order.findByIdAndUpdate(
          req.params.id,
          {
            status: status,
          },
          {
            new: true,
          }
        );

      if (!updatedOrder) {
        return res.status(404).json({
          message: "Order not found.",
        });
      }

      console.log(
        `Order ${updatedOrder.orderId} status changed to ${status}`
      );

      res.json({
        message:
          "Order status updated successfully!",
        order: updatedOrder,
      });
    } catch (error) {
      console.error(
        "Update order status error:",
        error
      );

      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// DELETE ORDER

app.delete(
  "/api/orders/:id",
  async (req, res) => {
    try {
      const deletedOrder =
        await Order.findByIdAndDelete(
          req.params.id
        );

      if (!deletedOrder) {
        return res.status(404).json({
          message: "Order not found.",
        });
      }

      res.json({
        message:
          "Order deleted successfully!",
        order: deletedOrder,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
);

// =========================
// SERVER
// =========================

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `SHOPORA Backend running on http://localhost:${PORT}`
  );
});