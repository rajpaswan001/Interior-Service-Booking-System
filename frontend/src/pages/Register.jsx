
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { API_URL } from "../config/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleRegister(event) {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/customers/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail ||
          data.message ||
          data.error ||
          "Registration failed"
        );
      }

      setMessage("Registration successful! You can now sign in.");

      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      setMessage(error.message || "Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-image">
        <img
          src="/images/hero-interior.jpg"
          alt="Elegant interior design"
        />

        <div className="login-image-content">
          <p className="eyebrow">LIVUC INTERIOR</p>
          <h1>Your Dream Space Starts Here.</h1>
          <p>
            Create an account to get started with your interior
            service enquiry.
          </p>
        </div>
      </section>

      <section className="login-form-container">
        <form className="login-form" onSubmit={handleRegister}>
          <p className="eyebrow">JOIN LIVUC INTERIOR</p>
          <h2>Create Account</h2>

          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            autoComplete="name"
            required
          />

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            required
          />

          <label htmlFor="phone">Phone Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            autoComplete="tel"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            minLength={8}
            required
          />

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {message && <p role="status">{message}</p>}

          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>

          <Link to="/" className="login-back">
            ← Back to Home
          </Link>
        </form>
      </section>
    </main>
  );
}

export default Register;
