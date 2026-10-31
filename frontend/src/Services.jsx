
import { Link } from "react-router-dom";

const serviceList = [
  {
    number: "01",
    title: "Painting Services",
    description:
      "Give your home or workspace a fresh look with professional painting. We focus on surface preparation, neat application and quality finishing.",
    image: "/images/painting.jpg",
    features: [
      "Interior wall painting",
      "Colour selection assistance",
      "Quality-focused finishing",
    ],
    service: "Painting",
  },
  {
    number: "02",
    title: "Interior Design",
    description:
      "Create a comfortable and attractive space with thoughtful design choices suited to your requirements, style and available space.",
    image: "/images/interior-design.jpg",
    features: [
      "Space planning",
      "Colour and material selection",
      "Functional interior solutions",
    ],
    service: "Interior Design",
  },
  {
    number: "03",
    title: "Wood Polishing",
    description:
      "Enhance the appearance of wooden furniture and surfaces with careful preparation and a polished finish.",
    image: "/images/wood-polishing.jpg",
    features: [
      "Furniture polishing",
      "Wood surface finishing",
      "Attention to finishing details",
    ],
    service: "Wood Polishing",
  },
];

function Services() {
  return (
    <main className="services-page">
      <section className="services-header">
        <p className="eyebrow">OUR SERVICES</p>
        <h1>Thoughtful Work. Beautiful Results.</h1>
        <p>
          Explore our services for your home or workspace and
          choose the one that suits your project.
        </p>
      </section>

      <section className="services-list">
        {serviceList.map((service) => (
          <article key={service.number}>
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
            />

            <div>
              <p className="eyebrow">
                SERVICE {service.number}
              </p>

              <h2>{service.title}</h2>

              <p>{service.description}</p>

              <ul>
                {service.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>

              <Link
                to={`/enquiry?service=${encodeURIComponent(
                  service.service
                )}`}
                className="primary-button"
              >
                Enquire About This Service
              </Link>
            </div>
          </article>
        ))}
      </section>

      <section className="home-cta">
        <p className="eyebrow">HAVE A PROJECT IN MIND?</p>
        <h2>Let's Discuss Your Requirements</h2>
        <p>
          Choose a service and tell us your preferred date.
        </p>

        <Link to="/enquiry" className="primary-button">
          Send an Enquiry
        </Link>
      </section>
    </main>
  );
}

export default Services;
