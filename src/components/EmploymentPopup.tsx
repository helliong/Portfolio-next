"use client";

import { ArrowUpRight, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { usePreferences } from "./PreferencesProvider";

type Props = { isOpen: boolean; onClose: () => void; onSuccess: () => void };
type WorkFormat = "Full-time" | "Contract" | "Remote" | "Office";
type Errors = Partial<Record<"name" | "email" | "company" | "position" | "message" | "submit", string>>;
type ApiResponse = { success?: boolean; message?: string };

/** Renders a dedicated form for employment and contract opportunities. */
export default function EmploymentPopup({ isOpen, onClose, onSuccess }: Props) {
  const { localizedHref, t } = usePreferences();
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [workFormat, setWorkFormat] = useState<WorkFormat>("Full-time");
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (isOpen) {
      setErrors({});
      setShow(true);
      const frame = window.requestAnimationFrame(() => setAnimate(true));
      const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus(), 320);
      return () => {
        window.cancelAnimationFrame(frame);
        window.clearTimeout(focusTimer);
      };
    }
    setAnimate(false);
    const hideTimer = window.setTimeout(() => setShow(false), 260);
    return () => window.clearTimeout(hideTimer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSending) onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, isSending, onClose]);

  const clearError = (field: keyof Errors) => {
    setErrors((current) => ({ ...current, [field]: undefined, submit: undefined }));
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
        className={`project-popup employment-popup ${animate ? "is-visible" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <button type="button" className="project-popup-close" onClick={onClose} disabled={isSending} aria-label={t("Close dialog", "Закрыть окно")}>
          <X size={22} strokeWidth={1.4} aria-hidden="true" />
        </button>

        <header className="project-popup-header">
          <span className="project-popup-number font-dot" aria-hidden="true">01</span>
          <div>
            <h2 id={titleId}>{t("DISCUSS A POSITION", "ОБСУДИТЬ ПОЗИЦИЮ")}</h2>
            <span className="project-popup-status">{t("OPEN TO OPPORTUNITIES", "ОТКРЫТ К ПРЕДЛОЖЕНИЯМ")}</span>
          </div>
        </header>

        <p id={descriptionId} className="project-popup-intro">
          {t(
            "Tell me about the team, role and what you are building. I’ll get back to you soon.",
            "Расскажите о команде, позиции и продукте. Я свяжусь с вами в ближайшее время.",
          )}
        </p>

        <form
          className="project-popup-form"
          noValidate
          onSubmit={async (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            const formData = new FormData(form);
            const name = String(formData.get("name") ?? "").trim();
            const email = String(formData.get("email") ?? "").trim();
            const company = String(formData.get("company") ?? "").trim();
            const position = String(formData.get("position") ?? "").trim();
            const message = String(formData.get("message") ?? "").trim();
            const nextErrors: Errors = {};

            if (!name) nextErrors.name = t("enter your name", "введите имя");
            if (!email) nextErrors.email = t("enter email", "введите email");
            else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = t("enter a valid email", "введите корректный email");
            if (!company) nextErrors.company = t("enter the company name", "укажите компанию");
            if (!position) nextErrors.position = t("enter the position", "укажите позицию");
            if (!message) nextErrors.message = t("tell me about the opportunity", "расскажите о предложении");
            setErrors(nextErrors);
            if (Object.keys(nextErrors).length > 0) return;

            try {
              setIsSending(true);
              const response = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  name,
                  email,
                  projectType: "Employment opportunity",
                  message: [`Company: ${company}`, `Position: ${position}`, `Work format: ${workFormat}`, "", message].join("\n"),
                }),
              });
              const payload = (await response.json().catch(() => null)) as ApiResponse | null;
              if (!response.ok || !payload?.success) {
                setErrors((current) => ({
                  ...current,
                  submit: response.status === 429
                    ? t("too many requests. please try again later", "слишком много запросов. попробуйте позже")
                    : t("something went wrong. please try again later", "что-то пошло не так. попробуйте позже"),
                }));
                return;
              }
              onClose();
              window.setTimeout(() => {
                onSuccess();
                form.reset();
                setWorkFormat("Full-time");
              }, 300);
            } catch {
              setErrors((current) => ({ ...current, submit: t("something went wrong. please try again later", "что-то пошло не так. попробуйте позже") }));
            } finally {
              setIsSending(false);
            }
          }}
        >
          <div className="project-popup-fields employment-popup-fields">
            <label className="project-popup-field">
              <span>{t("YOUR NAME", "ВАШЕ ИМЯ")}</span>
              <input ref={firstFieldRef} name="name" autoComplete="name" maxLength={100} disabled={isSending} aria-invalid={Boolean(errors.name)} onChange={() => clearError("name")} />
              {errors.name && <small role="alert">{errors.name}</small>}
            </label>
            <label className="project-popup-field">
              <span>EMAIL</span>
              <input name="email" type="email" autoComplete="email" maxLength={254} disabled={isSending} aria-invalid={Boolean(errors.email)} onChange={() => clearError("email")} />
              {errors.email && <small role="alert">{errors.email}</small>}
            </label>
            <label className="project-popup-field">
              <span>{t("COMPANY", "КОМПАНИЯ")}</span>
              <input name="company" autoComplete="organization" maxLength={120} disabled={isSending} aria-invalid={Boolean(errors.company)} onChange={() => clearError("company")} />
              {errors.company && <small role="alert">{errors.company}</small>}
            </label>
            <label className="project-popup-field">
              <span>{t("POSITION", "ПОЗИЦИЯ")}</span>
              <input name="position" maxLength={120} disabled={isSending} aria-invalid={Boolean(errors.position)} onChange={() => clearError("position")} />
              {errors.position && <small role="alert">{errors.position}</small>}
            </label>
            <label className="project-popup-field employment-popup-format">
              <span>{t("WORK FORMAT", "ФОРМАТ РАБОТЫ")}</span>
              <span className="project-popup-select">
                <select name="workFormat" value={workFormat} disabled={isSending} onChange={(event) => setWorkFormat(event.target.value as WorkFormat)}>
                  <option value="Full-time">full-time</option>
                  <option value="Contract">{t("contract", "контракт")}</option>
                  <option value="Remote">{t("remote", "удалённо")}</option>
                  <option value="Office">{t("office", "офис")}</option>
                </select>
                <ChevronDown size={18} strokeWidth={1.4} aria-hidden="true" />
              </span>
            </label>
            <label className="project-popup-field project-popup-message">
              <span>{t("MESSAGE", "СООБЩЕНИЕ")}</span>
              <textarea name="message" rows={5} maxLength={4500} disabled={isSending} aria-invalid={Boolean(errors.message)} placeholder={t("A few words about the role, team and product...", "Несколько слов о позиции, команде и продукте...")} onChange={() => clearError("message")} />
              {errors.message && <small role="alert">{errors.message}</small>}
            </label>
          </div>

          {errors.submit && <p className="project-popup-submit-error" role="alert">{errors.submit}</p>}
          <footer className="project-popup-footer">
            <p>{t("Usually replies within 24 hours", "Обычно отвечаю в течение 24 часов")}</p>
            <div className="project-popup-submit-panel">
              <div className="project-popup-button-row">
                <button type="button" className="project-popup-cancel" onClick={onClose} disabled={isSending}>{t("CANCEL", "ОТМЕНА")}</button>
                <button type="submit" className="project-popup-submit" disabled={isSending}>
                  {isSending ? t("SENDING...", "ОТПРАВКА...") : t("SEND OFFER", "ОТПРАВИТЬ")}
                  {!isSending && <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />}
                </button>
              </div>
              <p className="project-popup-privacy-note">
                {t("By sending the form, you agree to the", "Отправляя форму, вы соглашаетесь с")} {" "}
                <Link href={localizedHref("/privacy")}>{t("Privacy Policy", "Политикой конфиденциальности")}</Link>.
              </p>
            </div>
          </footer>
        </form>
      </section>
    </div>
  );
}
