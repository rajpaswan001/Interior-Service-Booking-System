
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { customer, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    }
  }

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        LIVUC <span>INTERIOR</span>
      </Link>

      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Our Services</Link>
        <Link to="/enquiry">Enquiry</Link>

        {customer ? (
          <>
            <Link to="/dashboard">My Dashboard</Link>
            <span>Welcome, {customer.name}</span>
            <button
              type="button"
              className="nav-login"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-login">Login</Link>
            <Link to="/register" className="nav-login">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
