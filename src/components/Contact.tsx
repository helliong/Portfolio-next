import { ArrowUpRight } from "lucide-react";

const socials = [
  ["github", "https://github.com/helliong"],
  ["telegram", "https://t.me/lege0rge"],
  ["instagram", "https://www.instagram.com/hellliong/"],
];

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-title">have a project<br />in mind?</div>

      <div className="contact-action">
        <a href="mailto:saoffabg@gmail.com" className="contact-link">
          let&apos;s talk <ArrowUpRight size={30} aria-hidden="true" />
        </a>
        <a href="mailto:saoffabg@gmail.com" className="contact-email">
          saoffabg@gmail.com
        </a>
      </div>

      <div className="contact-socials">
        <span className="status-label">available for freelance</span>
        <div>
          {socials.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer">
              {label}<ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
