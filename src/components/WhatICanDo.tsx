const services = [
  {
    number: "01",
    title: "web development",
    description: "Building fast, responsive and scalable web applications with a maintainable frontend architecture.",
    items: ["Custom web applications", "Responsive layout", "API integration", "Deployment"],
  },
  {
    number: "02",
    title: "ui implementation",
    description: "Turning layouts into precise, accessible interfaces that remain comfortable on every screen.",
    items: ["Figma to code", "Component systems", "Interaction states", "Cross-browser support"],
  },
  {
    number: "03",
    title: "performance & accessibility",
    description: "Improving loading, semantics and usability so a product feels clear and dependable in daily use.",
    items: ["Core Web Vitals", "Accessibility", "SEO foundations", "Code splitting"],
  },
];

export default function WhatICanDo() {
  return (
    <section id="services" className="portfolio-section">
      <div className="section-heading">
        <span className="accent-dash" aria-hidden="true" />
        <h2>services / what I do</h2>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <article key={service.number} className="service-item">
            <span className="service-number">{service.number}</span>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <ul>
              {service.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
