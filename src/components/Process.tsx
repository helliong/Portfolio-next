const steps = [
  ["01", "discovery", "Understanding the goal, audience and project requirements."],
  ["02", "direction", "Defining structure, references and the visual approach."],
  ["03", "development", "Building clean, scalable and performant code."],
  ["04", "launch", "Testing, polishing and preparing the project for release."],
];

export default function Process() {
  return (
    <section className="portfolio-section process-section">
      <div className="section-heading">
        <span className="accent-dash" aria-hidden="true" />
        <h2>process / how we work</h2>
      </div>
      <div className="process-grid">
        {steps.map(([number, title, description]) => (
          <article key={number}>
            <div><span>{number}</span><h3>{title}</h3></div>
            <p>{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
