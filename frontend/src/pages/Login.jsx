
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();
  
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/customers/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || data.message || "Invalid email or password."
        );
      }
       login(data);
      setMessage("Login successful! Welcome, " + data.name + ".");

      // Abhi sirf successful login response handle ho raha hai.
      // Secure session/token authentication baad mein add karenge.
      setTimeout(() => {
      navigate("/dashboard");
   }, 1500);
    } catch (error) {
      setMessage(
        error.message || "Server se connect nahi ho pa raha hai."
      );
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
          <h1>Beautiful Spaces Begin With a Vision.</h1>
          <p>
            Welcome to a place where thoughtful design meets
            quality finishing.
          </p>
        </div>
      </section>

      <section className="login-form-container">
        <form className="login-form" onSubmit={handleLogin}>
          <p className="eyebrow">WELCOME BACK</p>
          <h2>Sign In</h2>

          <p>
            Sign in to continue to Livuc Interior.
          </p>

          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {message && (
            <p role="status" aria-live="polite">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="primary-button"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <Link to="/" className="login-back">
            ← Back to Home
          </Link>
        </form>
      </section>
    </main>
  );
}

export default Login;
