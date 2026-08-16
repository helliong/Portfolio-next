"use client";

import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePreferences } from "./PreferencesProvider";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

type Errors = {
  name: string;
  email: string;
  message: string;
  submit: string;
};

type ApiResponse = {
  success?: boolean;
  code?: string;
  message?: string;
  retryAfter?: number;
};

const cooldownStorageKey = "portfolio_contact_cooldown";
const clientCooldownMs = 5 * 60 * 1_000;

const emptyErrors: Errors = {
  name: "",
  email: "",
  message: "",
  submit: "",
};

/** Renders and manages the validated project request form. */
export default function SelfServicePopup({ isOpen, onClose, onSuccess }: Props) {
  const { t } = usePreferences();
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<Errors>(emptyErrors);
  const [cooldownUntil, setCooldownUntil] = useState(0);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  /** Persists a cooldown and immediately updates the current tab. */
  const applyCooldown = (until: number) => {
    setCooldownUntil(until);
    setCooldownRemaining(Math.max(0, Math.ceil((until - Date.now()) / 1_000)));

    try {
      window.localStorage.setItem(cooldownStorageKey, String(until));
    } catch {
      // localStorage can be unavailable in privacy modes; the server limit remains authoritative.
    }
  };

  // Restore the persisted cooldown whenever the dialog opens.
  useEffect(() => {
    if (isOpen) {
      try {
        const storedCooldown = Number(window.localStorage.getItem(cooldownStorageKey));

        if (Number.isFinite(storedCooldown) && storedCooldown > Date.now()) {
          setCooldownUntil(storedCooldown);
          setCooldownRemaining(Math.ceil((storedCooldown - Date.now()) / 1_000));
        } else {
          window.localStorage.removeItem(cooldownStorageKey);
          setCooldownUntil(0);
          setCooldownRemaining(0);
        }
      } catch {
        setCooldownUntil(0);
        setCooldownRemaining(0);
      }

      setShow(true);
      const animationFrame = window.requestAnimationFrame(() => setAnimate(true));
      const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 320);
      return () => {
        window.cancelAnimationFrame(animationFrame);
        window.clearTimeout(focusTimer);
      };
    }

    setAnimate(false);
    const hideTimer = window.setTimeout(() => setShow(false), 260);
    return () => window.clearTimeout(hideTimer);
  }, [isOpen]);

  // Update the visible countdown and remove expired cooldown data.
  useEffect(() => {
    if (!cooldownUntil) return;

    const updateCooldown = () => {
      const remaining = Math.max(0, Math.ceil((cooldownUntil - Date.now()) / 1_000));
      setCooldownRemaining(remaining);

      if (remaining === 0) {
        setCooldownUntil(0);
        setErrors((current) => ({ ...current, submit: "" }));
        try {
          window.localStorage.removeItem(cooldownStorageKey);
        } catch {
          // The in-memory cooldown has still expired.
        }
      }
    };

    updateCooldown();
    const timer = window.setInterval(updateCooldown, 1_000);
    return () => window.clearInterval(timer);
  }, [cooldownUntil]);

  // Keep the cooldown consistent when the form is open in multiple tabs.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== cooldownStorageKey) return;

      const nextCooldown = Number(event.newValue);
      if (Number.isFinite(nextCooldown) && nextCooldown > Date.now()) {
        setCooldownUntil(nextCooldown);
        setCooldownRemaining(Math.ceil((nextCooldown - Date.now()) / 1_000));
      } else {
        setCooldownUntil(0);
        setCooldownRemaining(0);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Lock page scrolling and support closing the dialog with Escape.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSending) onClose();
    };

    document.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, isSending, onClose]);

  /** Clears the edited field error and any stale submission error. */
  const clearError = (field: keyof Errors) => {
    setErrors((current) => ({ ...current, [field]: "", submit: "" }));
  };

  /** Formats a duration as minutes and zero-padded seconds. */
  const formatCooldown = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  if (!show) return null;

  return (
    <div
      className={`project-popup-backdrop ${animate ? "is-visible" : ""}`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSending) onClose();
      }}
    >
      <section
        className={`project-popup ${animate ? "is-visible" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <button
          type="button"
          className="project-popup-close"
          onClick={onClose}
          disabled={isSending}
          aria-label={t("Close dialog", "Закрыть окно")}
        >
          <X size={22} strokeWidth={1.4} aria-hidden="true" />
        </button>

        <header className="project-popup-header">
          <span className="project-popup-number font-dot" aria-hidden="true">01</span>
          <div>
            <h2 id={titleId}>{t("START A PROJECT", "НАЧАТЬ ПРОЕКТ")}</h2>
            <span className="project-popup-status">{t("AVAILABLE FOR FREELANCE", "ДОСТУПЕН ДЛЯ ПРОЕКТОВ")}</span>
          </div>
        </header>

        <p id={descriptionId} className="project-popup-intro">
          {t("Tell me what you're building and I'll get back to you.", "Расскажите о вашем проекте, и я свяжусь с вами.")}
        </p>

        <form
          className="project-popup-form"
          noValidate
          onSubmit={async (event) => {
            event.preventDefault();

            if (cooldownUntil > Date.now()) return;

            const form = event.currentTarget;
            const formData = new FormData(form);
            const name = String(formData.get("name") ?? "").trim();
            const email = String(formData.get("email") ?? "").trim();
            const projectType = String(formData.get("projectType") ?? "").trim();
            const message = String(formData.get("message") ?? "").trim();
            const nextErrors = { ...emptyErrors };

            if (!name) nextErrors.name = t("enter your name", "введите имя");
            if (!email) nextErrors.email = t("enter email", "введите email");
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              nextErrors.email = t("enter a valid email", "введите корректный email");
            }
            if (!message) nextErrors.message = t("write something about your project", "расскажите о проекте");

            setErrors(nextErrors);
            if (nextErrors.name || nextErrors.email || nextErrors.message) return;

            try {
              setIsSending(true);
              const response = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, projectType, message }),
              });

              const payload = (await response.json().catch(() => null)) as ApiResponse | null;

              if (response.status === 429) {
                const retryAfter =
                  typeof payload?.retryAfter === "number" && payload.retryAfter > 0
                    ? payload.retryAfter
                    : 60;
                applyCooldown(Date.now() + retryAfter * 1_000);
                setErrors((current) => ({
                  ...current,
                  submit: t("too many requests. please wait before trying again", "слишком много запросов. попробуйте позже"),
                }));
                return;
              }

              if (!response.ok || !payload?.success) {
                throw new Error(payload?.message ?? "Failed to send request");
              }

              applyCooldown(Date.now() + clientCooldownMs);

              onClose();
              window.setTimeout(() => {
                onSuccess();
                form.reset();
                setErrors(emptyErrors);
              }, 300);
            } catch {
              setErrors((current) => ({
                ...current,
                submit: t("something went wrong. please try again later", "что-то пошло не так. попробуйте позже"),
              }));
            } finally {
              setIsSending(false);
            }
          }}
        >
          <div className="project-popup-fields">
            <label className="project-popup-field">
              <span>{t("YOUR NAME", "ВАШЕ ИМЯ")}</span>
              <input
                ref={firstFieldRef}
                name="name"
                type="text"
                placeholder="Egor"
                autoComplete="name"
                disabled={isSending}
                aria-invalid={Boolean(errors.name)}
                onChange={() => clearError("name")}
              />
              {errors.name && <small>{errors.name}</small>}
            </label>

            <label className="project-popup-field">
              <span>EMAIL</span>
              <input
                name="email"
                type="email"
                placeholder="hello@example.com"
                autoComplete="email"
                disabled={isSending}
                aria-invalid={Boolean(errors.email)}
                onChange={() => clearError("email")}
              />
              {errors.email && <small>{errors.email}</small>}
            </label>

            <label className="project-popup-field project-popup-type">
              <span>{t("PROJECT TYPE", "ТИП ПРОЕКТА")}</span>
              <span className="project-popup-select">
                <select name="projectType" defaultValue="Website" disabled={isSending}>
                  <option value="Website">{t("Website", "Сайт")}</option>
                  <option value="Web application">{t("Web application", "Веб-приложение")}</option>
                  <option value="Landing page">{t("Landing page", "Лендинг")}</option>
                  <option value="Interface design">{t("Interface design", "Дизайн интерфейса")}</option>
                  <option value="Other">{t("Other", "Другое")}</option>
                </select>
                <ChevronDown size={18} strokeWidth={1.4} aria-hidden="true" />
              </span>
            </label>

            <label className="project-popup-field project-popup-message">
              <span>{t("MESSAGE", "СООБЩЕНИЕ")}</span>
              <textarea
                name="message"
                placeholder={t("A short project description...", "Кратко опишите проект...")}
                rows={5}
                disabled={isSending}
                aria-invalid={Boolean(errors.message)}
                onChange={() => clearError("message")}
              />
              {errors.message && <small>{errors.message}</small>}
            </label>
          </div>

          {errors.submit && <p className="project-popup-submit-error">{errors.submit}</p>}
          {!errors.submit && cooldownRemaining > 0 && (
            <p className="project-popup-submit-error">
              {t("Request sent. Try again in", "Заявка отправлена. Повторите через")} {formatCooldown(cooldownRemaining)}
            </p>
          )}

          <footer className="project-popup-footer">
            <p>{t("Usually replies within 24 hours", "Обычно отвечаю в течение 24 часов")}</p>
            <div className="project-popup-submit-panel">
              <div className="project-popup-button-row">
                <button
                  type="button"
                  className="project-popup-cancel"
                  onClick={onClose}
                  disabled={isSending}
                >
                  {t("CANCEL", "ОТМЕНА")}
                </button>
                <button
                  type="submit"
                  className="project-popup-submit"
                  disabled={isSending || cooldownRemaining > 0}
                >
                  {isSending
                    ? t("SENDING...", "ОТПРАВКА...")
                    : cooldownRemaining > 0
                      ? `${t("TRY AGAIN IN", "ПОВТОРИТЬ ЧЕРЕЗ")} ${formatCooldown(cooldownRemaining)}`
                      : t("SEND REQUEST", "ОТПРАВИТЬ")}
                  {!isSending && cooldownRemaining === 0 && (
                    <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
                  )}
                </button>
              </div>
              <p className="project-popup-privacy-note">
                {t("By clicking “Send request”, you agree to the", "Нажимая «Отправить», вы соглашаетесь с")} {" "}
                <Link href="/privacy">{t("Privacy Policy", "Политикой конфиденциальности")}</Link>.
              </p>
            </div>
          </footer>
        </form>
      </section>
    </div>
  );
}
