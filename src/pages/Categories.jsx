import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Categories() {
  const categories = [
    {
      name: "Fashion",
      icon: "👕",
      description: "Clothing, shoes, bags and more",
    },
    {
      name: "Electronics",
      icon: "📱",
      description: "Latest gadgets and smart devices",
    },
    {
      name: "Home & Kitchen",
      icon: "🏠",
      description: "Everything for your home",
    },
    {
      name: "Beauty",
      icon: "💄",
      description: "Beauty and personal care products",
    },
    {
      name: "Kids",
      icon: "🧸",
      description: "Fun products for kids",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="categories-page">
        <div className="categories-header">
          <p className="section-label">EXPLORE SHOPORA</p>
          <h1>Shop by Category</h1>
          <p>Find exactly what you're looking for.</p>
        </div>

        <div className="categories-page-grid">
          {categories.map((category) => (
            <Link
              to={`/products?category=${encodeURIComponent(category.name)}`}
              className="category-page-card"
              key={category.name}
            >
              <div className="category-page-icon">
                {category.icon}
              </div>

              <h2>{category.name}</h2>
              <p>{category.description}</p>

              <span>Explore →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

export default Categories;