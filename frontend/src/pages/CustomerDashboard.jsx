
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import { API_URL } from "../config/api";

function CustomerDashboard() {
  const { customer } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedBooking, setExpandedBooking] = useState(null);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch(`${API_URL}/bookings`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Bookings load nahi ho paayi.");
        }

        const data = await response.json();
        setBookings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (customer) {
      fetchBookings();
    }
  }, [customer]);

  if (!customer) {
    return <Navigate to="/login" replace />;
  }

  function formatDate(date) {
    if (!date) return "Not available";

    return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  function getStatus(booking) {
    return (booking.status || "PENDING").toUpperCase();
  }

  function toggleDetails(bookingId) {
    setExpandedBooking((current) =>
      current === bookingId ? null : bookingId
    );
  }

  return (
    <>
      <Navbar />

      <main className="dashboard-page">
        <section className="dashboard-hero">
          <div className="dashboard-welcome">
            <p className="eyebrow">YOUR PERSONAL SPACE</p>
            <h1>Welcome back, {customer.name}</h1>
            <p>
              Manage your interior service bookings and take the next step
              towards your dream space.
            </p>
            <Link to="/enquiry" className="primary-button">
              + Book a New Service
            </Link>
          </div>

          <div className="dashboard-summary">
            <p className="summary-label">TOTAL BOOKINGS</p>
            <h2>{loading ? "—" : bookings.length}</h2>
            <p>Your services with Livuc Interior</p>
          </div>
        </section>

        <section className="dashboard-bookings">
          <div className="dashboard-section-heading">
            <div>
              <p className="eyebrow">YOUR ACTIVITY</p>
              <h2>My Bookings</h2>
              <p>Keep track of your requested interior services.</p>
            </div>

            <span className="booking-count">
              {loading
                ? "Loading..."
                : `${bookings.length} ${
                    bookings.length === 1 ? "Booking" : "Bookings"
                  }`}
            </span>
          </div>

          {loading && (
            <p className="dashboard-message">Loading your bookings...</p>
          )}

          {error && (
            <p className="dashboard-message dashboard-error">{error}</p>
          )}

          {!loading && !error && bookings.length === 0 && (
            <div className="dashboard-empty">
              <h3>Your journey starts here</h3>
              <p>You have not made any bookings yet.</p>
              <Link to="/enquiry" className="primary-button">
                Explore Our Services
              </Link>
            </div>
          )}

          {!loading && !error && bookings.length > 0 && (
            <div className="booking-list">
              {bookings.map((booking) => {
                const status = getStatus(booking);
                const isExpanded = expandedBooking === booking.id;

                return (
                  <article className="booking-card" key={booking.id}>
                    <div className="booking-card-icon" aria-hidden="true">
                      LI
                    </div>

                    <div className="booking-card-details">
                      <p className="booking-reference">
                        BOOKING #{booking.id}
                      </p>

                      <h3>{booking.serviceName}</h3>

                      <p className="booking-date">
                        <span>Booking date</span>
                        {formatDate(booking.bookingDate)}
                      </p>
                    </div>

                    <div className="booking-card-action">
                      <span
                        className={`booking-status status-${status.toLowerCase()}`}
                      >
                        {status}
                      </span>

                      <button
                        type="button"
                        className="booking-details-button"
                        onClick={() => toggleDetails(booking.id)}
                        aria-expanded={isExpanded}
                      >
                        {isExpanded ? "Hide Details" : "View Details"}
                      </button>
                    </div>

                    {isExpanded && (
                      <div className="booking-expanded-details">
                        <h4>Booking Details</h4>

                        <p>
                          <strong>Booking ID:</strong> #{booking.id}
                        </p>

                        <p>
                          <strong>Service:</strong> {booking.serviceName}
                        </p>

                        <p>
                          <strong>Booking Date:</strong>{" "}
                          {formatDate(booking.bookingDate)}
                        </p>

                        <p>
                          <strong>Status:</strong> {status}
                        </p>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default CustomerDashboard;
