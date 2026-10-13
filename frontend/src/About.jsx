
import { Link } from 'react-router-dom';

function About() {
  return (
    <section className="about-section">
      <div className="about-mark">LI</div>

      <div className="about-content">
        <p className="eyebrow">GET TO KNOW US</p>

         <h2 style={{ color: 'saddlebrown' }}>About Livuc Interior</h2>
          <br />
        <p>
          I’m Raj from Livuc Interior, providing professional
          painting and wooden polishing services.
        </p>

        <p>
          Our focus is on quality finishes, attention to detail
          and creating beautiful, comfortable spaces for our clients.
        </p>
        

        <h3>Our Services</h3>
        <p>Painting</p>
        <p>Interior Design</p>
        <p>Wood Polishing</p>
        <h3>Get in Touch</h3>
<p>Instagram: @livuc_interior</p>
<p>Email: info@livucinterior.com</p>

        <Link to="/#services" className="text-link">
          Explore Our Services →
        </Link>

        <br />
        <br />

        <Link to="/" className="text-link">
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}

export default About;
