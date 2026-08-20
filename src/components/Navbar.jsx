import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // Get logged-in user
  const updateUser = () => {
    const savedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(savedUser);
  };

  // Calculate cart quantity
  const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalQuantity = cart.reduce(
      (total, item) => total + (item.quantity || 1),
      0
    );

    setCartCount(totalQuantity);
  };

  useEffect(() => {
    updateCartCount();
    updateUser();

    window.addEventListener("cartUpdated", updateCartCount);
    window.addEventListener("userUpdated", updateUser);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
      window.removeEventListener("userUpdated", updateUser);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      navigate(
        `/products?search=${encodeURIComponent(search)}`
      );

      setSearchOpen(false);
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");

    setUser(null);

    alert("You have been logged out!");

    navigate("/");
  };

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        SHOP<span>ORA</span>
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/deals">Deals</Link>
        <Link to="/about">About</Link>
      </nav>

      <div className="nav-actions">

        {searchOpen && (
          <form
            className="search-form"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </form>
        )}

        <button
          className="search-btn"
          onClick={() => setSearchOpen(!searchOpen)}
          type="button"
        >
          🔍
        </button>

        <Link to="/cart" className="cart-btn">
          🛒
          <span>{cartCount}</span>
        </Link>

        {user ? (
          <>
            <span className="user-name">
              👤 {user.name}
            </span>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="login-btn">
            Login
          </Link>
        )}

      </div>
    </header>
  );
}

export default Navbar;