
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { API_URL } from "../config/api";

function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  async function fetchAdminData() {
    try {
      setError("");

      const dashboardResponse = await fetch(
        `${API_URL}/admin/dashboard`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!dashboardResponse.ok) {
        throw new Error("Admin access denied.");
      }

      const dashboardData = await dashboardResponse.json();
      setAdminData(dashboardData);

      const bookingsResponse = await fetch(
        `${API_URL}/admin/bookings`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!bookingsResponse.ok) {
        throw new Error("Unable to load bookings.");
      }

      const bookingsData = await bookingsResponse.json();
      setBookings(bookingsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAdminData();
  }, []);

  async function handleStatusChange(bookingId, newStatus) {
    try {
      setError("");
      setSuccess("");
      setUpdatingId(bookingId);

      const response = await fetch(
        `${API_URL}/admin/bookings/${bookingId}/status`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update booking status.");
      }

      setSuccess(`Booking #${bookingId} status updated successfully.`);
      await fetchAdminData();
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingId(null);
    }
  }

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(
    (booking) => booking.status === "PENDING"
  ).length;
  const confirmedBookings = bookings.filter(
    (booking) => booking.status === "CONFIRMED"
  ).length;
  const completedBookings = bookings.filter(
    (booking) => booking.status === "COMPLETED"
  ).length;

  function getStatusClass(status) {
    return `status-badge status-${(status || "pending").toLowerCase()}`;
  }

  return (
    <>
      <Navbar />

      <main className="admin-page">
        <div className="admin-container">
          <header className="admin-header">
            <div>
              <p className="admin-eyebrow">LIVUC INTERIOR</p>
              <h1>Admin Dashboard</h1>
              <p>Manage your interior service bookings.</p>
            </div>

            <Link to="/" className="admin-home-button">
              Back to Home
            </Link>
          </header>

          {loading && (
            <p className="admin-loading">Loading dashboard...</p>
          )}

          {error && (
            <div className="admin-alert admin-error" role="alert">
              {error}
            </div>
          )}

          {success && (
            <div className="admin-alert admin-success">
              {success}
            </div>
          )}

          {adminData && !loading && (
            <>
              <section className="admin-welcome">
                <h2>Welcome, Admin!</h2>
                <p>
                  You can manage customer enquiries, view bookings
                  and update booking status from here.
                </p>
              </section>

              <section className="admin-stats">
                <div className="admin-stat-card">
                  <p>Total Bookings</p>
                  <h3>{totalBookings}</h3>
                </div>

                <div className="admin-stat-card">
                  <p>Pending</p>
                  <h3>{pendingBookings}</h3>
                </div>

                <div className="admin-stat-card">
                  <p>Confirmed</p>
                  <h3>{confirmedBookings}</h3>
                </div>

                <div className="admin-stat-card">
                  <p>Completed</p>
                  <h3>{completedBookings}</h3>
                </div>
              </section>

              <section className="admin-bookings-section">
                <h2>All Bookings</h2>
                <p>View customer booking details and manage status.</p>

                {bookings.length === 0 ? (
                  <div className="admin-empty">
                    No bookings available.
                  </div>
                ) : (
                  <div className="admin-table-wrapper">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Booking ID</th>
                          <th>Customer</th>
                          <th>Email</th>
                          <th>Service</th>
                          <th>Booking Date</th>
                          <th>Status</th>
                          <th>Update Status</th>
                        </tr>
                      </thead>

                      <tbody>
                        {bookings.map((booking) => (
                          <tr key={booking.id}>
                            <td>#{booking.id}</td>
                            <td>{booking.customerName}</td>
                            <td>{booking.customerEmail}</td>
                            <td>{booking.serviceName}</td>
                            <td>{booking.bookingDate}</td>

                            <td>
                              <span className={getStatusClass(booking.status)}>
                                {booking.status}
                              </span>
                            </td>

                            <td>
                              <select
                                className="status-select"
                                value={booking.status || "PENDING"}
                                disabled={updatingId === booking.id}
                                onChange={(e) =>
                                  handleStatusChange(
                                    booking.id,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="PENDING">Pending</option>
                                <option value="CONFIRMED">Confirmed</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
                              </select>

                              {updatingId === booking.id && (
                                <small> Updating...</small>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default AdminDashboard;
