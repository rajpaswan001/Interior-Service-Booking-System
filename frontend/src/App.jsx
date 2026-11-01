
import { useState } from "react";
import { FaInstagram } from "react-icons/fa";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import About from "./About";
import Services from "./Services";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import Navbar from "./components/Navbar";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import "./App.css";

const API_URL = "http://localhost:8080/bookings";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            LIVUC INTERIOR
          </Link>

          <p className="footer-tagline">
            Beautiful spaces. Quality finishes.
          </p>

          <p className="footer-description">
            Transforming spaces with thoughtful design
            and quality finishes.
          </p>
        </div>

        <div className="footer-column">
          <h3>Quick Links</h3>
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/services">Our Services</Link>
          <Link to="/enquiry">Enquiry</Link>
        </div>

        <div className="footer-column">
          <h3>Our Services</h3>
          <Link to="/services">Interior Design</Link>
          <Link to="/services">Painting</Link>
          <Link to="/services">Wood Polishing</Link>
        </div>

        <div className="footer-column footer-contact">
          <h3>Get in Touch</h3>

          <a href="mailto:livucinterior@gmail.com">
            <span className="contact-icon">✉</span>
            <span>livucinterior@gmail.com</span>
          </a>

          <a
            href="https://www.instagram.com/livuc_interior/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={20} />
            <span>@livuc_interior</span>
          </a>

          <p className="footer-contact-note">
            Have a project in mind? Get in touch with us.
          </p>

          <Link to="/enquiry" className="footer-cta">
            Start Your Project ↗
          </Link>
        </div>

        <div className="footer-column footer-gallery">
          <h3>Project Gallery</h3>

          <p className="footer-contact-note">
            I provide Painting & Wooden Polishing services —
            delivering quality work at affordable prices with
            timely completion, so you can Live with Unique Comfort.
          </p>

          <a
            href="https://drive.google.com/drive/folders/1ADhR5RDYe2CWJHX_w0m6h6FSwTjux0L7?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-gallery-link"
          >
            📷 View Paintings & Wood Polishing ↗
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Livuc Interior.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <Navbar />

      <main>
        <section className="hero">
          <div className="hero-content">
            <p className="eyebrow">WELCOME TO LIVUC INTERIOR</p>

            <h1>
              Transform Your Space Into Something Beautiful
            </h1>

            <p className="hero-description">
              Professional painting, interior design and wood
              polishing services for your home and workspace.
            </p>

            <div className="hero-actions">
              <Link to="/services" className="primary-button">
                Explore Our Services
              </Link>

              <Link to="/enquiry" className="secondary-button">
                Get a Quote
              </Link>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="/images/hero-interior.jpg"
              alt="Elegant modern interior"
            />
          </div>
        </section>

        <section className="home-services">
          <div className="section-heading">
            <p className="eyebrow">WHAT WE OFFER</p>
            <h2>Services Designed Around You</h2>
            <p>
              Quality workmanship and attention to detail for every
              space.
            </p>
          </div>

          <div className="all-services-link">
            <Link to="/services">View All Services →</Link>
          </div>
        </section>

        <section className="home-about">
          <div className="home-about-image">
            <img
              src="/images/interior-detail.jpg"
              alt="Interior finishing details"
              loading="lazy"
            />
          </div>

          <div className="home-about-content">
            <p className="eyebrow">WHY LIVUC INTERIOR</p>
            <h2>Every Detail Makes a Difference</h2>

            <p>
              We focus on quality finishes, careful workmanship and
              solutions that suit your space and requirements.
            </p>

            <ul>
              <li>Attention to detail</li>
              <li>Professional service</li>
              <li>Quality-focused finishing</li>
            </ul>

            <Link to="/about" className="primary-button">
              Know More About Us
            </Link>
          </div>
        </section>

        <section className="home-cta">
          <p className="eyebrow">LET'S PLAN YOUR SPACE</p>
          <h2>Have a Project in Mind?</h2>
          <p>Tell us what you need and send us an enquiry.</p>

          <Link to="/enquiry" className="primary-button">
            Start Your Enquiry
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}

function Enquiry() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const selectedService = queryParams.get("service");

  const validServices = [
    "Painting",
    "Interior Design",
    "Wood Polishing",
  ];

  const initialService = validServices.includes(selectedService)
    ? selectedService
    : "Painting";

  const [serviceName, setServiceName] = useState(initialService);
  const [bookingDate, setBookingDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleBookingSubmit(event) {
    event.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceName,
          bookingDate,
        }),
      });

      if (!response.ok) {
        const errorDetails = await response.text();

        console.error("Booking API status:", response.status);
        console.error("Booking API error:", errorDetails);

        throw new Error(
          `Booking failed: ${response.status} - ${errorDetails}`
        );
      }

      const booking = await response.json();

      setMessage(
        `Enquiry successful! Booking ID: ${booking.id ?? "Received"}`
      );

      setBookingDate("");
    } catch (err) {
      setError(
        err.message || "Backend se connection nahi ho paaya."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <main className="enquiry-page">
        <section className="enquiry-intro">
          <p className="eyebrow">LET'S CONNECT</p>
          <h1>Tell Us About Your Project</h1>
          <p>
            Select a service and your preferred date to send an
            enquiry.
          </p>
        </section>

        <section className="enquiry-layout">
          <div className="enquiry-image">
            <img
              src="/images/interior-detail.jpg"
              alt="Beautiful interior finishing"
            />
          </div>

          <form
            className="booking-form"
            onSubmit={handleBookingSubmit}
          >
            <h2>Send an Enquiry</h2>

            <label htmlFor="serviceName">Select Service</label>

            <select
              id="serviceName"
              value={serviceName}
              onChange={(event) => setServiceName(event.target.value)}
              required
            >
              {validServices.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>

            <label htmlFor="bookingDate">Preferred Date</label>

            <input
              id="bookingDate"
              type="date"
              value={bookingDate}
              onChange={(event) => setBookingDate(event.target.value)}
              min={new Date().toLocaleDateString("en-CA")}
              required
            />

            <button
              type="submit"
              className="primary-button"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Enquiry"}
            </button>

            {message && (
              <p className="success-message" role="status">
                {message}
              </p>
            )}

            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}

            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/")}
            >
              ← Back to Home
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
          <Route path="/services" element={<><Navbar /><Services /><Footer /></>} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/dashboard"
            element={<CustomerDashboard />}
          />

          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
