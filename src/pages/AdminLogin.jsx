import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Demo Admin Login
    if (
      email === "biyaarooj@gmail.com" &&
      password === "ishmal@123"
) {
      localStorage.setItem("adminLoggedIn", "true");

      alert("Admin login successful!");

      navigate("/admin");
    } else {
      alert("Invalid admin email or password");
    }
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-box">

        <div className="admin-login-icon">
          🔐
        </div>

        <p className="admin-login-label">
          SHOPORA ADMIN
        </p>

        <h1>Admin Login</h1>

        <p className="admin-login-text">
          Login to manage your store
        </p>

        <form onSubmit={handleLogin}>

          <label>Email Address</label>

          <input
            type="email"
            placeholder="Enter admin email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button type="submit">
            Login to Dashboard
          </button>

        </form>

        <button
          type="button"
          className="admin-back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Website
        </button>

      </div>

    </div>
  );
}

export default AdminLogin;
