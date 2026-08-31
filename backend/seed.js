const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");

const products = [
  {
    name: "Wireless Headphones",
    category: "Electronics",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    description: "High-quality wireless headphones with clear sound.",
  },
  {
    name: "Smart Watch",
    category: "Electronics",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    description: "Modern smartwatch for everyday use.",
  },
  {
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 34.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
    description: "Portable Bluetooth speaker with powerful sound.",
  },
  {
    name: "Mechanical Keyboard",
    category: "Electronics",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    description: "Comfortable mechanical keyboard for work and gaming.",
  },
  {
    name: "Wireless Mouse",
    category: "Electronics",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80",
    description: "Smooth and responsive wireless mouse.",
  },

  {
    name: "Classic Sneakers",
    category: "Fashion",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    description: "Classic sneakers suitable for everyday wear.",
  },
  {
    name: "Cotton T-Shirt",
    category: "Fashion",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
    description: "Soft and comfortable cotton T-shirt.",
  },
  {
    name: "Denim Jeans",
    category: "Fashion",
    price: 44.99,
    image:
      "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
    description: "Stylish denim jeans with a comfortable fit.",
  },
  {
    name: "Travel Backpack",
    category: "Fashion",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    description: "Durable backpack for travel and daily use.",
  },

  {
    name: "Modern Table Lamp",
    category: "Home & Kitchen",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    description: "Modern table lamp for a stylish home.",
  },
  {
    name: "Coffee Maker",
    category: "Home & Kitchen",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80",
    description: "Easy-to-use coffee maker for fresh coffee.",
  },
  {
    name: "Non-Stick Frying Pan",
    category: "Home & Kitchen",
    price: 32.99,
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=600&q=80",
    description: "Durable non-stick frying pan for everyday cooking.",
  },

  {
    name: "Skin Care Set",
    category: "Beauty",
    price: 24.99,
    image:
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80",
    description: "Complete skincare set for daily care.",
  },
  {
    name: "Luxury Perfume",
    category: "Beauty",
    price: 54.99,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
    description: "Elegant fragrance with a long-lasting scent.",
  },
  {
    name: "Makeup Kit",
    category: "Beauty",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
    description: "Complete makeup kit for everyday looks.",
  },

  {
    name: "Kids Toy Set",
    category: "Kids",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80",
    description: "Fun toy set for kids.",
  },
  {
    name: "Building Blocks",
    category: "Kids",
    price: 22.99,
    image:
      "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80",
    description: "Creative building blocks for children.",
  },
  {
    name: "Kids School Backpack",
    category: "Kids",
    price: 27.99,
    image:
      "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&w=600&q=80",
    description: "Comfortable school backpack for kids.",
  },

  {
    name: "Breakfast Cereal",
    category: "Grocery",
    price: 8.99,
    image:
      "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?auto=format&fit=crop&w=600&q=80",
    description: "Tasty breakfast cereal for your morning.",
  },
  {
    name: "Cooking Oil",
    category: "Grocery",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    description: "Quality cooking oil for everyday meals.",
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected!");

    await Product.deleteMany();

    console.log("Old products removed.");

    await Product.insertMany(products);

    console.log(
      `${products.length} products added successfully!`
    );

    await mongoose.connection.close();

    console.log("MongoDB connection closed.");

  } catch (error) {
    console.error(
      "Error adding products:",
      error.message
    );

    process.exit(1);
  }
};

seedProducts();