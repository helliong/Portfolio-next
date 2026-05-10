"use client";

import { useEffect, useState } from "react";
import SelfServicePopup from "./SelfServicePopup";
import SuccessPopup from "./SuccessPopup";


const text = "front-end.web(developer)";

export default function Header() {
  const [typedText, setTypedText] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    let index = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeEffect = () => {
      if (!isDeleting) {
        setTypedText(text.substring(0, index + 1));
        index += 1;

        if (index === text.length) {
          timeoutId = setTimeout(() => {
            isDeleting = true;
            typeEffect();
          }, 1200);
          return;
        }
      } else {
        setTypedText(text.substring(0, index - 1));
        index -= 1;

        if (index === 0) {
          timeoutId = setTimeout(() => {
            isDeleting = false;
            typeEffect();
          }, 500);
          return;
        }
      }

      timeoutId = setTimeout(typeEffect, isDeleting ? 40 : 80);
    };

    typeEffect();

    return () => clearTimeout(timeoutId);
  }, []);

  const toggleTheme = () => {
    setIsLight((prev) => {
      const next = !prev;
      document.body.classList.toggle("light", next);
      return next;
    });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    window.scrollTo({
      top: el.offsetTop,
      behavior: "smooth",
    });
  };

  const showSuccessPopup = () => {
    setIsSuccessOpen(true);

    setTimeout(() => {
      setIsSuccessOpen(false);
    }, 2000);
  };

  return (
    <header
      id="home"
      className="relative flex min-h-screen flex-col pt-6 sm:pt-8 lg:pt-[7vh]"
    >
      <div className="flex items-start justify-between gap-4">
        <img
          src={
            isLight
              ? "/logoBlack.svg"
              : "/logoWhite.svg"
          }
          alt="logo"
          className="h-auto w-[52px] sm:w-[64px] lg:w-[72px]"
        />
        <div className="relative text-sm font-semibold sm:text-base">
          <button
            type="button"
            onClick={() => setIsPopupOpen(true)}
            className="flex cursor-pointer items-end text-[var(--text-color)]"
          >
            <span className="relative top-[6px] mr-1 h-[2px] w-4 bg-[var(--line-color)]" />
            self service
          </button>

          <span
            onClick={() => setIsPopupOpen(true)}
            className="block cursor-pointer text-right text-[10px] font-[var(--font-weight)] opacity-[var(--opacity)]"
          >
            20% OFF
          </span>

          <button
            type="button"
            onClick={toggleTheme}
            className="
  hidden
  lg:block
  lg:absolute
  lg:right-[-50%]
  lg:top-30%
  lg:origin-top-left
  lg:-rotate-90
  lg:translate-y-[75vh]

  cursor-pointer
  text-[15px]
  font-semibold
  opacity-80
  transition
  hover:opacity-100
"
          >
            {isLight ? "dark mode" : "light mode"}
          </button>
        </div>
      </div>

      <nav className="portfolio-nav">
        {["contact", "about", "projects", "cases", "home"].map(
          (item, index) => (
            <button
              key={item}
              type="button"
              onClick={() => scrollToSection(item)}
            >
              {item}
              <span
                className={`nav-line ${index === 4 ? "nav-line-home" : ""}`}
              />
            </button>
          ),
        )}
      </nav>

      <div className="flex min-h-[55vh] items-center justify-center text-center lg:mt-[10%] lg:min-h-[40vh]">
        <span className="relative inline-block font-dot text-[30px] sm:text-[38px] md:text-[46px] lg:text-[50px]">
          {typedText}
          <span className="absolute left-full top-full h-1 w-5 -translate-y-[5px] animate-blink bg-[var(--line-color)] sm:w-[28px] lg:w-[35px]" />
        </span>
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
