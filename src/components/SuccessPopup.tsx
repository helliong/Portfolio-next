"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { usePreferences } from "./PreferencesProvider";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

/** Renders the animated confirmation shown after a request is accepted. */
export default function SuccessPopup({ isOpen, onClose }: Props) {
  const { t } = usePreferences();
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Keep the dialog mounted until its closing transition finishes.
  useEffect(() => {
    if (isOpen) {
      setShow(true);

      setTimeout(() => {
        setAnimate(true);
      }, 10);
    } else {
      setAnimate(false);

      setTimeout(() => {
        setShow(false);
      }, 300);
    }
  }, [isOpen]);

  if (!show) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm
        transition-opacity duration-300
        ${animate ? "opacity-100" : "opacity-0"}
      `}
    >
      <div
        className={`
          w-[400px] rounded-2xl border border-white/20 bg-[var(--bg-color)] p-8 text-center shadow-2xl
          transition-all duration-300 ease-out
          ${animate ? "scale-100 translate-y-0 opacity-100" : "scale-90 translate-y-5 opacity-0"}
        `}
      >
        <div className="mb-6 flex justify-center">
          <div
            className={`
              flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20
              shadow-[0_0_20px_rgba(34,197,94,0.6)]
              transition-all delay-150 duration-500 ease-out
              ${animate ? "scale-100 opacity-100" : "scale-0 opacity-0"}
            `}
          >
            <Check size={32} className="text-green-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold lowercase">{t("request sent", "заявка отправлена")}</h2>

        <p className="mt-3 text-[14px] opacity-[var(--opacity)]">
          {t("I will contact you soon", "Я скоро свяжусь с вами")}
        </p>
      </div>
    </div>
  );
}
