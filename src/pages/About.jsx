import Navbar from "../components/Navbar";

function About() {
  return (
    <>
      <Navbar />

      <section className="about-page">
        <div className="about-hero">
          <p className="section-label">ABOUT SHOPORA</p>

          <h1>
            Shopping Made
            <span> Simple.</span>
          </h1>

          <p>
            Shopora is your one-stop online store for everyday essentials,
            trending products, and great deals.
          </p>
        </div>

        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon">🛍️</div>
            <h2>Everything in One Place</h2>
            <p>
              From fashion and electronics to home essentials and beauty,
              discover everything you need in one convenient store.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">✨</div>
            <h2>Quality Products</h2>
            <p>
              We carefully select products to provide a reliable and enjoyable
              shopping experience.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">🚚</div>
            <h2>Easy Shopping</h2>
            <p>
              Browse products, add them to your cart and enjoy a smooth,
              simple checkout experience.
            </p>
          </div>
        </div>

        <section className="about-story">
          <div>
            <p className="section-label">OUR STORY</p>
            <h2>Built for Everyday Shopping</h2>

            <p>
              Shopora was created with a simple idea: make online shopping
              easy, enjoyable and accessible.
            </p>

            <p>
              Whether you're looking for the latest gadgets, fashion items,
              home products or everyday essentials, Shopora brings everything
              together in one place.
            </p>
          </div>

          <div className="about-visual">
            🛒
          </div>
        </section>
      </section>
    </>
  );
}

export default About;