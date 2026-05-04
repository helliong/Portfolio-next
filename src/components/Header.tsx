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

  function toggleTheme() {
    setIsLight((prev) => {
      const next = !prev;
      document.body.classList.toggle("light", next);
      return next;
    });
  }

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);

    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    window.history.replaceState(null, "", "/");
  };

  const showSuccessPopup = () => {
    setIsSuccessOpen(true);

    setTimeout(() => {
      setIsSuccessOpen(false);
    }, 2000);
  };

  return (
    <header id="home" className="relative flex min-h-screen flex-col">
      <div className="flex justify-between max-md:flex-col max-md:gap-2.5">
        <img
          src={
            isLight
              ? "/assets/img/icons/logoBlack.svg"
              : "/assets/img/icons/logoWhite.svg"
          }
          alt="logo"
          className="w-auto max-md:w-[15vw]"
        />

        <div className="relative cursor-pointer text-base font-semibold text-[var(--text-color)]">
          <button
            type="button"
            onClick={() => setIsPopupOpen(true)}
            className="flex items-end text-[var(--text-color)] cursor-pointer"
          >
            <span className="relative top-[6px] mr-1 h-[2px] w-4 bg-[var(--line-color)]" />
            self service
          </button>
          <span
            className="block text-right text-[10px] font-[var(--font-weight)] opacity-[var(--opacity)]"
            onClick={() => setIsPopupOpen(true)}
          >
            20% OFF
          </span>

          <button
            type="button"
            onClick={toggleTheme}
            className="absolute right-[-50%] top-1/2 origin-top-left translate-y-[75vh] -rotate-90 cursor-pointer rounded-2xl text-[15px] font-semibold transition max-md:hidden"
          >
            {isLight ? "dark mode" : "light mode"}
          </button>
        </div>
      </div>

      <div className="relative max-md:hidden">
        <nav className="absolute left-[-6%] top-[82vh] z-10 flex origin-top-left -rotate-90 gap-[55px] group/menu">
          {["contact", "about", "projects", "cases", "home"].map((item) => {
            const isHome = item === "home";

            return (
              <button
                key={item}
                type="button"
                onClick={() => {
                  const el = document.getElementById(item);
                  if (!el) return;

                  window.scrollTo({
                    top: el.offsetTop,
                    behavior: "smooth",
                  });

                  window.history.replaceState(null, "", "/");
                }}
                className="group/item text-lg font-normal lowercase"
              >
                {item}

                <span
                  className={`
            mt-1.5 block h-[1.5px] bg-[var(--line-color)] transition-[width,opacity] duration-300 ease-out
            ${
              isHome
                ? "w-4 opacity-100 group-hover/menu:opacity-0 group-hover/menu:w-0 group-hover/item:opacity-100 group-hover/item:w-4"
                : "w-0 opacity-0 group-hover/item:w-4 group-hover/item:opacity-100"
            }
          `}
                />
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-[10%] flex min-h-[40vh] items-center justify-center">
        <span className="relative inline-block font-dot text-[50px] max-md:text-center max-md:text-[28px]">
          {typedText}
          <span className="absolute left-full top-full h-1 w-[35px] -translate-y-[5px] animate-blink bg-[var(--line-color)] max-md:w-5" />
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
