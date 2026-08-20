
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromURL =
    searchParams.get("category") || "All Products";

  const [selectedCategory, setSelectedCategory] =
    useState(categoryFromURL);

  const [selectedPrices, setSelectedPrices] = useState([]);

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  // =========================
  // PRODUCTS
  // =========================

  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: 49.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Electronics",
      price: 79.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 34.99,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Mechanical Keyboard",
      category: "Electronics",
      price: 69.99,
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      name: "Wireless Mouse",
      category: "Electronics",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=600&q=80",
    },

    {
      id: 6,
      name: "Classic Sneakers",
      category: "Fashion",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      name: "Cotton T-Shirt",
      category: "Fashion",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      name: "Denim Jeans",
      category: "Fashion",
      price: 44.99,
      image:
        "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 9,
      name: "Travel Backpack",
      category: "Fashion",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
    },

    {
      id: 10,
      name: "Modern Table Lamp",
      category: "Home & Kitchen",
      price: 29.99,
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 11,
      name: "Coffee Maker",
      category: "Home & Kitchen",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 12,
      name: "Non-Stick Frying Pan",
      category: "Home & Kitchen",
      price: 32.99,
      image:
        "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=600&q=80",
    },

    {
      id: 13,
      name: "Skin Care Set",
      category: "Beauty",
      price: 24.99,
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 14,
      name: "Luxury Perfume",
      category: "Beauty",
      price: 54.99,
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 15,
      name: "Makeup Kit",
      category: "Beauty",
      price: 39.99,
      image:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
    },

    {
      id: 16,
      name: "Kids Toy Set",
      category: "Kids",
      price: 19.99,
      image:
        "https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 17,
      name: "Building Blocks",
      category: "Kids",
      price: 22.99,
      image:
        "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 18,
      name: "Kids School Backpack",
      category: "Kids",
      price: 27.99,
      image:
        "https://images.unsplash.com/photo-1577733966973-d680bffd2e80?auto=format&fit=crop&w=600&q=80",
    },

    {
      id: 19,
      name: "Breakfast Cereal",
      category: "Grocery",
      price: 8.99,
      image:
        "https://images.unsplash.com/photo-1517093157656-b9eccef91cb1?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 20,
      name: "Cooking Oil",
      category: "Grocery",
      price: 12.99,
      image:
        "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    },
  ];

  // =========================
  // CATEGORIES
  // =========================

  const categories = [
    "All Products",
    "Fashion",
    "Electronics",
    "Home & Kitchen",
    "Beauty",
    "Kids",
    "Grocery",
  ];

  // =========================
  // PRICE RANGES
  // =========================

  const priceRanges = [
    {
      label: "Under $25",
      min: 0,
      max: 24.99,
    },
    {
      label: "$25 - $50",
      min: 25,
      max: 50,
    },
    {
      label: "$50 - $100",
      min: 50.01,
      max: 100,
    },
    {
      label: "Over $100",
      min: 100.01,
      max: Infinity,
    },
  ];

  // =========================
  // SEARCH HANDLER
  // =========================

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearchTerm(value);

    const params = {};

    if (selectedCategory !== "All Products") {
      params.category = selectedCategory;
    }

    if (value.trim() !== "") {
      params.search = value;
    }

    setSearchParams(params);
  };

  // =========================
  // CATEGORY HANDLER
  // =========================

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    const params = {};

    if (category !== "All Products") {
      params.category = category;
    }

    if (searchTerm.trim() !== "") {
      params.search = searchTerm;
    }

    setSearchParams(params);
  };

  // =========================
  // PRICE HANDLER
  // =========================

  const handlePriceChange = (priceLabel) => {
    setSelectedPrices((previousPrices) => {
      if (previousPrices.includes(priceLabel)) {
        return previousPrices.filter(
          (price) => price !== priceLabel
        );
      }

      return [...previousPrices, priceLabel];
    });
  };

  // =========================
  // ADD TO CART
  // =========================

  const handleAddToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    alert(`${product.name} added to cart!`);
  };

  // =========================
  // FILTER PRODUCTS
  // =========================

  let filteredProducts = [...products];

  if (selectedCategory !== "All Products") {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.category === selectedCategory
    );
  }

  if (searchTerm.trim() !== "") {
    filteredProducts = filteredProducts.filter(
      (product) =>
        `${product.name} ${product.category}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
  }

  if (selectedPrices.length > 0) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        selectedPrices.some((selectedPrice) => {
          const range = priceRanges.find(
            (price) => price.label === selectedPrice
          );

          return (
            product.price >= range.min &&
            product.price <= range.max
          );
        })
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <>
      <Navbar />

      <section className="products-page">
        <div className="products-header">
          <p className="section-label">
            SHOP OUR COLLECTION
          </p>

          <h1>{selectedCategory}</h1>

          <p>
            Discover products selected especially for you.
          </p>

          <div className="products-search">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
            />

            <span>🔍</span>
          </div>
        </div>

        <div className="products-layout">

          {/* SIDEBAR */}

          <aside className="products-sidebar">
            <h3>Categories</h3>

            {categories.map((category) => (
              <button
                key={category}
                className={
                  selectedCategory === category
                    ? "active-category"
                    : ""
                }
                onClick={() =>
                  handleCategoryChange(category)
                }
              >
                {category}
              </button>
            ))}

            <h3 className="price-heading">
              Price Range
            </h3>

            {priceRanges.map((range) => (
              <label key={range.label}>
                <input
                  type="checkbox"
                  checked={selectedPrices.includes(
                    range.label
                  )}
                  onChange={() =>
                    handlePriceChange(range.label)
                  }
                />

                {" "}
                {range.label}
              </label>
            ))}
          </aside>

          {/* PRODUCTS */}

          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  className="product-card"
                  key={product.id}
                >
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                    />
                  </div>

                  <div className="product-info">
                    <p>{product.category}</p>

                    <h3>{product.name}</h3>

                    <div className="product-bottom">
                      <strong>
                        ${product.price.toFixed(2)}
                      </strong>

                      <button
                        onClick={() =>
                          handleAddToCart(product)
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-products">
                <h3>No products found</h3>

                <p>
                  Try searching for another product.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
