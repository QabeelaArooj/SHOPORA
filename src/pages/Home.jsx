
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <p className="hero-small">WELCOME TO SHOPORA</p>

          <h1>
            Everything You Need,
            <br />
            <span>All in One Place.</span>
          </h1>

          <p className="hero-description">
            Discover quality products, amazing deals and everyday essentials
            at prices you'll love.
          </p>

          <div className="hero-buttons">
            {/* SHOP NOW */}
            <Link to="/products" className="primary-btn">
              Shop Now →
            </Link>

            {/* EXPLORE CATEGORIES */}
            <Link to="/categories" className="secondary-btn">
              Explore Categories
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="hero-circle">🛍️</div>
          <p>Fresh Deals</p>
          <h3>Up to 50% OFF</h3>
        </div>
      </section>

      {/* CATEGORY SECTION */}
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="section-label">SHOP BY CATEGORY</p>
            <h2>What are you looking for?</h2>
          </div>
        </div>

        <div className="categories">
          <Link
            to="/products?category=Fashion"
            className="category-card"
          >
            👕 Fashion
          </Link>

          <Link
            to="/products?category=Electronics"
            className="category-card"
          >
            📱 Electronics
          </Link>

          <Link
            to="/products?category=Home%20%26%20Kitchen"
            className="category-card"
          >
            🏠 Home & Kitchen
          </Link>

          <Link
            to="/products?category=Beauty"
            className="category-card"
          >
            💄 Beauty
          </Link>

          <Link
            to="/products?category=Kids"
            className="category-card"
          >
            🧸 Kids
          </Link>

          <Link
            to="/products?category=Grocery"
            className="category-card"
          >
            🛒 Grocery
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;

