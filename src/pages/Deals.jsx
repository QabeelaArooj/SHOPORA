import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Deals() {
  const deals = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      oldPrice: 79.99,
      price: 49.99,
      discount: "38% OFF",
      image: "🎧",
    },
    {
      id: 2,
      name: "Smart Watch",
      category: "Electronics",
      oldPrice: 119.99,
      price: 79.99,
      discount: "33% OFF",
      image: "⌚",
    },
    {
      id: 3,
      name: "Classic Sneakers",
      category: "Fashion",
      oldPrice: 89.99,
      price: 59.99,
      discount: "33% OFF",
      image: "👟",
    },
    {
      id: 4,
      name: "Travel Backpack",
      category: "Fashion",
      oldPrice: 69.99,
      price: 39.99,
      discount: "43% OFF",
      image: "🎒",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="deals-page">
        <div className="deals-header">
          <p className="section-label">LIMITED TIME OFFERS</p>
          <h1>🔥 Hot Deals</h1>
          <p>Don't miss these amazing offers. Shop before they're gone!</p>
        </div>

        <div className="deals-banner">
          <div>
            <p>MEGA SALE</p>
            <h2>Up to 50% OFF</h2>
            <span>On selected products for a limited time.</span>
          </div>

          <Link to="/products" className="primary-btn">
            Shop All Products →
          </Link>
        </div>

        <div className="deals-grid">
          {deals.map((deal) => (
            <div className="deal-card" key={deal.id}>
              <div className="deal-image">
                <span className="discount-badge">{deal.discount}</span>
                {deal.image}
              </div>

              <div className="deal-info">
                <p>{deal.category}</p>
                <h3>{deal.name}</h3>

                <div className="deal-price">
                  <strong>${deal.price}</strong>
                  <span>${deal.oldPrice}</span>
                </div>

                <button className="deal-btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Deals;