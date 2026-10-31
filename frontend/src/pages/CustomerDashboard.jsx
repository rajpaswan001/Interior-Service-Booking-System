
import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

function CustomerDashboard() {
  const { customer } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("http://localhost:8080/bookings", {
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
              {loading ? "Loading..." : `${bookings.length} bookings`}
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
              {bookings.map((booking) => (
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
                      {booking.bookingDate}
                    </p>
                  </div>

                  <div className="booking-card-action">
                    <span className="booking-label">My Service</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default CustomerDashboard;
