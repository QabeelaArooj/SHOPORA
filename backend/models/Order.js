const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },

    customer: {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      postalCode: {
        type: String,
        required: true,
      },

      payment: {
        type: String,
        required: true,
      },
    },

    products: [
      {
        id: String,
        name: String,
        price: Number,
        quantity: {
          type: Number,
          default: 1,
        },
        image: String,
      },
    ],

    subtotal: {
      type: Number,
      required: true,
    },

    delivery: {
      type: Number,
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    orderDate: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);