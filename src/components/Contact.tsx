"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import SelfServicePopup from "./SelfServicePopup";
import SuccessPopup from "./SuccessPopup";

const socials = [
  ["github", "https://github.com/helliong"],
  ["telegram", "https://t.me/lege0rge"],
  ["instagram", "https://www.instagram.com/hellliong/"],
];

/** Renders contact actions and coordinates the request and success dialogs. */
export default function Contact() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  /** Displays a short confirmation after a successful form submission. */
  const showSuccessPopup = () => {
    setIsSuccessOpen(true);
    window.setTimeout(() => setIsSuccessOpen(false), 2000);
  };

  return (
    <>
      <section id="contact" className="contact-section">
        <div className="contact-title">have a project<br />in mind?</div>

        <div className="contact-action">
          <button
            type="button"
            className="contact-link"
            onClick={() => setIsPopupOpen(true)}
          >
            let&apos;s talk <ArrowUpRight size={30} aria-hidden="true" />
          </button>
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

      <SelfServicePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSuccess={showSuccessPopup}
      />
      <SuccessPopup
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </>
  );
}
