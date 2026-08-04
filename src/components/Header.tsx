"use client";

import { ArrowDown, ArrowUpRight, MapPin, Moon, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import SelfServicePopup from "./SelfServicePopup";
import SuccessPopup from "./SuccessPopup";

const navItems = ["about", "services", "projects", "contact"];

export default function Header() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    setIsLight(document.body.classList.contains("light"));
  }, []);

  const toggleTheme = () => {
    setIsLight((current) => {
      const next = !current;
      document.body.classList.toggle("light", next);
      return next;
    });
  };

  const showSuccessPopup = () => {
    setIsSuccessOpen(true);
    window.setTimeout(() => setIsSuccessOpen(false), 2000);
  };

  return (
    <header id="home" className="site-header">
      <div className="topbar">
        <a href="#home" aria-label="Back to top" className="brand-mark">
          <Image
            src={isLight ? "/logoBlack.svg" : "/logoWhite.svg"}
            alt="Egor Yakovlev"
            width={52}
            height={36}
            priority
          />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item}`}>
              {item}
            </a>
          ))}
        </nav>

        <div className="topbar-actions">
          <button
            type="button"
            className="order-action"
            onClick={() => setIsPopupOpen(true)}
          >
            <span>order a website</span>
            <small>20% OFF</small>
          </button>
          <span className="topbar-divider" aria-hidden="true" />
          <button
            type="button"
            className="icon-action"
            onClick={toggleTheme}
            aria-label={
              isLight ? "Switch to dark mode" : "Switch to light mode"
            }
            title={isLight ? "dark mode" : "light mode"}
          >
            {isLight ? <Moon size={17} /> : <Sun size={17} />}
            <span>{isLight ? "dark mode" : "light mode"}</span>
          </button>
        </div>
      </div>

      <div className="hero-grid">
        <div className="hero-copy">
          <div>
            <h1 className="font-dot">
              <span className="hero-title-line">front-end web</span>
              <br />
              developer
              <span className="blink-cursor" aria-hidden="true" />
            </h1>
            <p>I build fast, accessible and focused web experiences.</p>
          </div>

          <div className="hero-meta">
            <span className="status-label">available for freelance</span>
            <span className="meta-separator" aria-hidden="true" />
            <span>
              <MapPin size={14} aria-hidden="true" /> based in Russia
            </span>
            <span className="meta-separator" aria-hidden="true" />
            <span>UTC +6</span>
          </div>

          <a href="#projects" className="scroll-link">
            <ArrowDown size={18} aria-hidden="true" />
            scroll to explore
          </a>
        </div>

        <article className="featured-project">
          <div className="featured-heading">
            <span className="section-kicker">selected project</span>
            <div className="featured-title-row">
              <h2>pin window</h2>
              <span className="status-label">open source</span>
            </div>
          </div>

          <Link href="/projects/pinwindow" className="featured-media">
            <Image
              src="/assets/img/projects/mockup-pinwindow.webp"
              alt="QR Link Generator project preview"
              fill
              sizes="(max-width: 900px) 100vw, 52vw"
              priority
            />
          </Link>

          <div className="featured-footer">
            <Link href="/projects/pinwindow" className="text-link">
              view project <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <div className="featured-facts">
              <span>
                <small>role</small>developer
              </span>
              <span>
                <small>stack</small>typescript
              </span>
              <span>
                <small>status</small>published
              </span>
            </div>
          </div>
        </article>
      </div>

      <SelfServicePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSuccess={showSuccessPopup}
      />
      <SuccessPopup
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
      />
    </header>
  );
}
