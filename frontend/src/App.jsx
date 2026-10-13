
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import About from './About';

function App() {
  const whatsappLink = 'https://wa.me/91YOURNUMBER';

  return (
    <BrowserRouter>
      <div className="app">
        {/* Navbar */}
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
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <section id="home" className="hero-section">
                    <div className="hero-content">
                      <p className="eyebrow">
                        WELCOME TO LIVUC INTERIOR
                      </p>

                      <h1>
                        Make Your Home
                        <br />
                        <span>Beautiful &amp; Modern</span>
                      </h1>

                      <p className="hero-description">
                        Professional painting, interior design and home
                        improvement services—all in one place.
                      </p>

                      <a href="#services" className="primary-button">
                        Explore Services →
                      </a>
                    </div>

                    <div className="hero-card">
                      <div className="room-icon">⌂</div>
                      <p>YOUR DREAM HOME</p>
                      <span className="hero-tagline">
                        LIVE WITH UNIQUE COMFORT.
                      </span>
                      <h2>Starts Here.</h2>
                      <span>Thoughtful design. Beautiful finishes.</span>
                    </div>
                  </section>

                  <section id="about" className="about-section">
                    <div className="about-mark">LI</div>

                    <div className="about-content">
                      <p className="eyebrow">
                        ABOUT LIVUC INTERIOR
                      </p>

                      <h2>We bring new life to your space.</h2>

                      <p>
                        From fresh wall colours to elegant interiors
                        and polished wooden furniture, we help
                        transform your space with care and attention
                        to detail.
                      </p>

                      <Link to="/about" className="text-link">
                        Know More About Us →
                      </Link>
                    </div>
                  </section>

                  <section id="services" className="services-section">
                    <p className="eyebrow">WHAT WE DO</p>
                    <h2>Our Services</h2>

                    <p className="section-description">
                      Professional services to make your space look its best.
                    </p>

                    <div className="service-grid">
                      <article className="service-card">
                        <div className="service-icon">🎨</div>
                        <h3>Painting</h3>
                        <p>
                          Give your walls a fresh and beautiful look
                          with professional painting services.
                        </p>
                        <a href="#contact">Enquire Now →</a>
                      </article>

                      <article className="service-card">
                        <div className="service-icon">🛋️</div>
                        <h3>Interior Design</h3>
                        <p>
                          Create a comfortable and stylish living or
                          working space that suits your needs.
                        </p>
                        <a href="#contact">Enquire Now →</a>
                      </article>

                      <article className="service-card">
                        <div className="service-icon">🪵</div>
                        <h3>Wood Polishing</h3>
                        <p>
                          Bring back the shine of wooden furniture,
                          doors and other wooden surfaces.
                        </p>
                        <a href="#contact">Enquire Now →</a>
                      </article>
                    </div>
                  </section>

                  <section id="contact" className="booking-section">
                    <p className="eyebrow">GET STARTED</p>
                    <h2>Ready to improve your space?</h2>

                    <p>
                      Tell us about your project and contact us to
                      discuss your requirements and quotation.
                    </p>

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

            {/* About Page */}
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
            © {new Date().getFullYear()} Livuc Interior.
            All rights reserved.
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
