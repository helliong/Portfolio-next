import { projects } from "@/data/projects";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="portfolio-section">
      <div className="section-heading">
        <span className="accent-dash" aria-hidden="true" />
        <h2>about / developer</h2>
      </div>

      <div className="about-grid">
        <div className="about-statement">
          I turn clear ideas into fast, thoughtful web experiences.
        </div>

        <div className="about-details">
          <p>
            I&apos;m Egor Yakovlev, a front-end developer based in Russia. I build
            responsive interfaces and practical web products with close
            attention to structure, performance and the details people notice.
          </p>
          <div className="about-stats">
            <div><strong>{projects.length}+</strong><span>projects</span></div>
            <div><strong>Russia</strong><span>location</span></div>
            <div><strong>100%</strong><span>attention</span></div>
          </div>
        </div>

        <div className="about-mark" aria-label="Egor Yakovlev logo">
          <span className="about-mark-logo">
            <Image
              src="/logoWhite.svg"
              alt=""
              width={182}
              height={130}
            />
          </span>
          <i aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
