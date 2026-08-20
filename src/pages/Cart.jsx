import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    // Make sure every product has a valid quantity
    const fixedCart = savedCart.map((item) => ({
      ...item,
      quantity: Number(item.quantity) || 1,
    }));

    setCart(fixedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(fixedCart)
    );
  }, []);

  const updateQuantity = (id, change) => {
    const updatedCart = cart
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + change,
          };
        }

        return item;
      })
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    const updatedCart = cart.filter(
      (item) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * item.quantity,
    0
  );

  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <>
      <Navbar />

      <section className="cart-page">

        <div className="cart-header">
          <p className="section-label">
            YOUR SHOPPING CART
          </p>

          <h1>Shopping Cart</h1>

          <p>
            Review your products before checkout.
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">

            <div className="empty-cart-icon">
              🛒
            </div>

            <h2>Your cart is empty</h2>

            <p>
              Looks like you haven't added anything yet.
            </p>

            <Link to="/products">
              Continue Shopping
            </Link>

          </div>
        ) : (
          <>
            {/* CONTINUE SHOPPING */}

            <div className="continue-shopping">
              <Link to="/products">
                ← Continue Shopping
              </Link>
            </div>

            <div className="cart-layout">

              {/* CART ITEMS */}

              <div className="cart-items">

                {cart.map((item) => (

                  <div
                    className="cart-item"
                    key={item.id}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div className="cart-item-info">

                      <p>{item.category}</p>

                      <h3>{item.name}</h3>

                      <strong>
                        ${Number(item.price).toFixed(2)}
                      </strong>

                    </div>

                    {/* QUANTITY */}

                    <div className="quantity-controls">

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            -1
                          )
                        }
                      >
                        −
                      </button>

                      <span>
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          updateQuantity(
                            item.id,
                            1
                          )
                        }
                      >
                        +
                      </button>

                    </div>

                    {/* TOTAL */}

                    <div className="cart-item-total">

                      <strong>
                        $
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toFixed(2)}
                      </strong>

                      <button
                        type="button"
                        className="remove-btn"
                        onClick={() =>
                          removeItem(item.id)
                        }
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                ))}

              </div>

              {/* ORDER SUMMARY */}

              <aside className="cart-summary">

                <h2>Order Summary</h2>

                <div className="summary-row">

                  <span>Items</span>

                  <span>{totalItems}</span>

                </div>

                <div className="summary-row">

                  <span>Subtotal</span>

                  <strong>
                    ${total.toFixed(2)}
                  </strong>

                </div>

                <div className="summary-row">

                  <span>Shipping</span>

                  <span>Free</span>

                </div>

                <hr />

                <div className="summary-total">

                  <span>Total</span>

                  <strong>
                    ${total.toFixed(2)}
                  </strong>

                </div>

                <Link
  to="/checkout"
  className="checkout-btn"
>
  Proceed to Checkout
</Link>

              </aside>

            </div>
          </>
        )}

      </section>
    </>
  );
}

export default Cart;