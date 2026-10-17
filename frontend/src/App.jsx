
import { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import About from './About';

const API_URL = 'http://localhost:8080/bookings';

function App() {
  const whatsappLink = 'https://wa.me/YOUR_PHONE_NUMBER';

  const [serviceName, setServiceName] = useState('Painting');
  const [bookingDate, setBookingDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Service button click hone par booking section tak scroll karo
  function handleEnquireClick(service) {
    setServiceName(service);
    setMessage('');
    setError('');

    const contactSection = document.getElementById('contact');

    if (contactSection) {
      contactSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else {
      alert('Booking section nahi mila. App.jsx mein id="contact" check karo.');
    }
  }

  // Booking form backend ko submit karta hai
  async function handleBookingSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceName,
          bookingDate,
        }),
      });

      if (!response.ok) {
        throw new Error('Booking submit nahi hui. Dobara try karo.');
      }

      const booking = await response.json();

      setMessage(
        `Booking successful! Your booking ID is ${booking.id}.`
      );

      setServiceName('Painting');
      setBookingDate('');
    } catch (err) {
      setError(
        err.message ||
          'Server se connect nahi ho paaya. Please dobara try karo.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <BrowserRouter>
      <div className="app">
        {/* Navigation */}
        <header className="navbar">
          <Link to="/" className="brand">
            Livuc<span>Interior</span>
          </Link>

          <nav>
            <Link to="/">Home</Link>
            <a href="/#services">Services</a>
            <Link to="/about">About</Link>
            <a href="/#contact">Contact</a>
          </nav>

          <a
            href={whatsappLink}
            className="nav-button"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp Enquiry ↗
          </a>
        </header>

        <main>
          <Routes>
            {/* Home page */}
            <Route
              path="/"
              element={
                <>
                  {/* Hero section */}
                  <section id="home" className="hero-section">
                    <p className="eyebrow">LIVUC INTERIOR</p>

                    <h1>Beautiful Spaces. Quality Finishes.</h1>

                    <p>
                      Professional painting, interior design and wood
                      polishing services for your space.
                    </p>

                    <a href="#services" className="light-button">
                      Explore Our Services →
                    </a>
                  </section>

                  {/* About section */}
                  <section id="about" className="about-section">
                    <p className="eyebrow">ABOUT US</p>

                    <h2>Transforming Spaces with Care</h2>

                    <p>
                      We help make homes and workplaces look beautiful
                      with professional interior finishing services.
                    </p>

                    <Link to="/about" className="enquire-link">
                      Learn More →
                    </Link>
                  </section>

                  {/* Services section */}
                  <section
                    id="services"
                    className="services-section"
                  >
                    <p className="eyebrow">WHAT WE DO</p>

                    <h2>Our Services</h2>

                    <p>
                      Professional services to make your space look
                      its best.
                    </p>

                    <div className="services-grid">
                      {/* Painting */}
                      <article className="service-card">
                        <div className="service-icon">🎨</div>

                        <h3>Painting</h3>

                        <p>
                          Give your walls a fresh and beautiful look
                          with professional painting services.
                        </p>

                        <button
                          type="button"
                          className="enquire-link"
                          onClick={() =>
                            handleEnquireClick('Painting')
                          }
                        >
                          Enquire Now →
                        </button>
                      </article>

                      {/* Interior Design */}
                      <article className="service-card">
                        <div className="service-icon">🛋️</div>

                        <h3>Interior Design</h3>

                        <p>
                          Create a comfortable and stylish living or
                          working space that suits your needs.
                        </p>

                        <button
                          type="button"
                          className="enquire-link"
                          onClick={() =>
                            handleEnquireClick('Interior Design')
                          }
                        >
                          Enquire Now →
                        </button>
                      </article>

                      {/* Wood Polishing */}
                      <article className="service-card">
                        <div className="service-icon">🪵</div>

                        <h3>Wood Polishing</h3>

                        <p>
                          Bring back the shine of wooden furniture,
                          doors and other wooden surfaces.
                        </p>

                        <button
                          type="button"
                          className="enquire-link"
                          onClick={() =>
                            handleEnquireClick('Wood Polishing')
                          }
                        >
                          Enquire Now →
                        </button>
                      </article>
                    </div>
                  </section>

                  {/* Booking section */}
                  <section
                    id="contact"
                    className="booking-section"
                  >
                    <p className="eyebrow">BOOK A SERVICE</p>

                    <h2>Ready to Improve Your Space?</h2>

                    <p>
                      Select a service and your preferred date to send
                      a booking request.
                    </p>

                    <form
                      onSubmit={handleBookingSubmit}
                      className="booking-form"
                    >
                      <label htmlFor="serviceName">
                        Select Service
                      </label>

                      <select
                        id="serviceName"
                        value={serviceName}
                        onChange={(event) =>
                          setServiceName(event.target.value)
                        }
                        required
                      >
                        <option value="Painting">Painting</option>
                        <option value="Interior Design">
                          Interior Design
                        </option>
                        <option value="Wood Polishing">
                          Wood Polishing
                        </option>
                      </select>

                      <label htmlFor="bookingDate">
                        Preferred Booking Date
                      </label>

                      <input
                        id="bookingDate"
                        type="date"
                        value={bookingDate}
                        min={new Date().toLocaleDateString('en-CA')}
                        onChange={(event) =>
                          setBookingDate(event.target.value)
                        }
                        required
                      />

                      <button
                        type="submit"
                        className="light-button"
                        disabled={loading}
                      >
                        {loading
                          ? 'Submitting...'
                          : 'Book Now →'}
                      </button>

                      {message && (
                        <p role="status">{message}</p>
                      )}

                      {error && (
                        <p role="alert">{error}</p>
                      )}
                    </form>

                    <p>Prefer to talk to us first?</p>

                    <a
                      href={whatsappLink}
                      className="light-button"
                      target="_blank"
                      rel="noreferrer"
                    >
                      WhatsApp Us ↗
                    </a>
                  </section>
                </>
              }
            />

            {/* About page */}
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <Link to="/" className="brand footer-brand">
            Livuc<span>Interior</span>
          </Link>

          <p>Beautiful spaces. Quality finishes.</p>

          <p className="copyright">
            © {new Date().getFullYear()} Livuc Interior. All rights
            reserved.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
```