
import { Link } from "react-router-dom";


function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <p className="eyebrow">ABOUT LIVUC INTERIOR</p>
        <h1>Spaces That Feel Like You</h1>
        <p>
          We help transform homes and workspaces through thoughtful
          interior design, professional painting and quality wood
          polishing.
        </p>
      </section>

      <section className="about-content">
        <div className="about-image">
          <img
            src="/images/interior-detail.jpg"
            alt="Carefully finished interior space"
          />
        </div>

        <div className="about-copy">
          <p className="eyebrow">WHO WE ARE</p>
          <h2>Live With Unique Comfort</h2>

          <p>
            At Livuc Interior, we believe that every space deserves
            attention, care and a finish that reflects its purpose.
          </p>

          <p>
            From refreshing walls with paint to enhancing furniture
            with wood polishing, our focus is on quality workmanship
            and service suited to each project.
          </p>

          <p>
            We work to understand your requirements and help you
            choose practical solutions for your home or workspace.
          </p>

          <Link to="/services" className="primary-button">
            Explore Our Services
          </Link>
        </div>
      </section>

      <section className="about-values">
        <p className="eyebrow">WHAT MATTERS TO US</p>
        <h2>Our Approach</h2>

        <div className="service-grid">
          <article className="service-card">
            <div className="service-card-content">
              <h3>Quality Workmanship</h3>
              <p>
                We focus on careful execution and a clean,
                professional finish.
              </p>
            </div>
          </article>

          <article className="service-card">
            <div className="service-card-content">
              <h3>Attention to Detail</h3>
              <p>
                We consider the small details that contribute to
                the overall look of a space.
              </p>
            </div>
          </article>

          <article className="service-card">
            <div className="service-card-content">
              <h3>Client Requirements</h3>
              <p>
                We aim to understand your needs before planning the
                work for your project.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="home-cta">
        <p className="eyebrow">START YOUR PROJECT</p>
        <h2>Let's Talk About Your Space</h2>
        <p>
          Tell us about your requirements and preferred service.
        </p>

        <Link to="/enquiry" className="primary-button">
          Send an Enquiry
         </Link>
         <br />
         <br />
<     Link to="/" className="back-home">
       ← Back to Home
      </Link>



      </section>
    </main>
  );
}

export default About;
