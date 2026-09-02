import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  // =========================
  // URL PARAMETERS
  // =========================

  const categoryFromURL =
    searchParams.get("category") || "All Products";

  const searchFromURL =
    searchParams.get("search") || "";

  // =========================
  // STATES
  // =========================

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState(categoryFromURL);

  const [selectedPrices, setSelectedPrices] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState(searchFromURL);

  // =========================
  // FETCH PRODUCTS
  // =========================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        if (!response.ok) {
          throw new Error(
            `Server error: ${response.status}`
          );
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error(
          "Products fetch error:",
          error
        );

        setError(
          "Unable to load products. Please make sure the backend server is running."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const existingProduct =
      existingCart.find(
        (item) => item._id === product._id
      );

    let updatedCart;

    if (existingProduct) {
      updatedCart = existingCart.map(
        (item) =>
          item._id === product._id
            ? {
                ...item,
                quantity:
                  (item.quantity || 1) + 1,
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

    alert(
      `${product.name} added to cart!`
    );
  };

  // =========================
  // FILTER PRODUCTS
  // =========================

  let filteredProducts = [...products];

  // Category filter
  if (
    selectedCategory !==
    "All Products"
  ) {
    filteredProducts =
      filteredProducts.filter(
        (product) =>
          product.category ===
          selectedCategory
      );
  }

  // Search filter
  if (searchTerm.trim() !== "") {
    filteredProducts =
      filteredProducts.filter(
        (product) =>
          `${product.name} ${product.category} ${product.description || ""}`
            .toLowerCase()
            .includes(
              searchTerm.toLowerCase()
            )
      );
  }

  // Price filter
  if (selectedPrices.length > 0) {
    filteredProducts =
      filteredProducts.filter(
        (product) =>
          selectedPrices.some(
            (selectedPrice) => {
              const range =
                priceRanges.find(
                  (price) =>
                    price.label ===
                    selectedPrice
                );

              return (
                product.price >=
                  range.min &&
                product.price <=
                  range.max
              );
            }
          )
      );
  }

  // =========================
  // LOADING STATE
  // =========================

  if (loading) {
    return (
      <>
        <Navbar />

        <section className="products-page">
          <div className="no-products">
            <h3>
              Loading products...
            </h3>

            <p>
              Please wait while we load
              products from the database.
            </p>
          </div>
        </section>
      </>
    );
  }

  // =========================
  // ERROR STATE
  // =========================

  if (error) {
    return (
      <>
        <Navbar />

        <section className="products-page">
          <div className="no-products">
            <h3>
              Unable to Load Products
            </h3>

            <p>{error}</p>

            <button
              onClick={() =>
                window.location.reload()
              }
            >
              Try Again
            </button>
          </div>
        </section>
      </>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <>
      <Navbar />

      <section className="products-page">

        {/* =========================
            HEADER
        ========================= */}

        <div className="products-header">

          <p className="section-label">
            SHOP OUR COLLECTION
          </p>

          <h1>
            {selectedCategory}
          </h1>

          <p>
            Discover products selected
            especially for you.
          </p>

          {/* SEARCH */}

          <div className="products-search">

            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
            />

            <span>
              🔍
            </span>

          </div>

        </div>

        {/* =========================
            PRODUCTS LAYOUT
        ========================= */}

        <div className="products-layout">

          {/* =========================
              SIDEBAR
          ========================= */}

          <aside className="products-sidebar">

            <h3>
              Categories
            </h3>

            {categories.map(
              (category) => (
                <button
                  key={category}
                  className={
                    selectedCategory ===
                    category
                      ? "active-category"
                      : ""
                  }
                  onClick={() =>
                    handleCategoryChange(
                      category
                    )
                  }
                >
                  {category}
                </button>
              )
            )}

            <h3 className="price-heading">
              Price Range
            </h3>

            {priceRanges.map(
              (range) => (
                <label
                  key={range.label}
                >
                  <input
                    type="checkbox"
                    checked={selectedPrices.includes(
                      range.label
                    )}
                    onChange={() =>
                      handlePriceChange(
                        range.label
                      )
                    }
                  />

                  {" "}
                  {range.label}
                </label>
              )
            )}

          </aside>

          {/* =========================
              PRODUCTS
          ========================= */}

          <div className="products-grid">

            {filteredProducts.length >
            0 ? (
              filteredProducts.map(
                (product) => (
                  <div
                    className="product-card"
                    key={product._id}
                  >

                    {/* IMAGE */}

                    <div className="product-image">

                      <img
                        src={product.image}
                        alt={product.name}
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/600x400?text=No+Image";
                        }}
                      />

                    </div>

                    {/* INFO */}

                    <div className="product-info">

                      <p>
                        {product.category}
                      </p>

                      <h3>
                        {product.name}
                      </h3>

                      {product.description && (
                        <small>
                          {product.description}
                        </small>
                      )}

                      <div className="product-bottom">

                        <strong>
                          $
                          {Number(
                            product.price
                          ).toFixed(2)}
                        </strong>

                        <button
                          onClick={() =>
                            handleAddToCart(
                              product
                            )
                          }
                        >
                          Add to Cart
                        </button>

                      </div>

                    </div>

                  </div>
                )
              )
            ) : (
              <div className="no-products">

                <h3>
                  No products found
                </h3>

                <p>
                  Try searching for
                  another product or
                  select a different
                  category.
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