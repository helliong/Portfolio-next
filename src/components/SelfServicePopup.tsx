"use client";

import { useEffect, useState } from "react";

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

export default function SelfServicePopup({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const [show, setShow] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const [errors, setErrors] = useState<Errors>({
    name: "",
    email: "",
    message: "",
    submit: "",
  });

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

  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSending) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, isSending, onClose]);

  const clearError = (field: keyof Errors) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
      submit: "",
    }));
  };

  if (!show) return null;

  return (
    <div
      onClick={() => {
        if (!isSending) onClose();
      }}
      className={`
        fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm
        transition-opacity duration-300
        ${animate ? "opacity-100" : "opacity-0"}
      `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          relative w-full max-w-[520px] rounded-2xl border border-white/20 bg-[var(--bg-color)] p-8 text-[var(--text-color)] shadow-2xl
          transition-all duration-300 ease-out
          ${
            animate
              ? "scale-100 translate-y-0 opacity-100"
              : "scale-90 translate-y-5 opacity-0"
          }
        `}
      >
        <button
          type="button"
          onClick={onClose}
          disabled={isSending}
          className="absolute right-5 top-4 cursor-pointer text-[24px] opacity-60 transition hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ×
        </button>

        <h2 className="text-[30px] font-bold lowercase">
          self service
          <span className="mt-2 block h-1 w-[70px] bg-[var(--line-color)]" />
        </h2>

        <p className="mt-4 text-[14px] font-light opacity-[var(--opacity)]">
          Fill out the form and I will contact you to discuss your website or
          interface.
        </p>

        <form
          noValidate
          className="mt-8 flex flex-col gap-4"
          onSubmit={async (e) => {
            e.preventDefault();

            const form = e.currentTarget;

            const nameInput = form.elements.namedItem(
              "name",
            ) as HTMLInputElement;
            const emailInput = form.elements.namedItem(
              "email",
            ) as HTMLInputElement;
            const projectTypeInput = form.elements.namedItem(
              "projectType",
            ) as HTMLInputElement;
            const messageInput = form.elements.namedItem(
              "message",
            ) as HTMLTextAreaElement;

            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const projectType = projectTypeInput.value.trim();
            const message = messageInput.value.trim();

            const newErrors: Errors = {
              name: "",
              email: "",
              message: "",
              submit: "",
            };

            if (!name) {
              newErrors.name = "enter your name";
            }

            if (!email) {
              newErrors.email = "enter email";
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
              newErrors.email = "enter a valid email";
            }

            if (!message) {
              newErrors.message = "write something about your project";
            }

            setErrors(newErrors);

            if (newErrors.name || newErrors.email || newErrors.message) {
              return;
            }

            try {
              setIsSending(true);

              const response = await fetch("/api/send", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  name,
                  email,
                  projectType,
                  message,
                }),
              });

              if (!response.ok) {
                throw new Error("Failed to send request");
              }

              onClose();

              setTimeout(() => {
                onSuccess();
                form.reset();
                setErrors({
                  name: "",
                  email: "",
                  message: "",
                  submit: "",
                });
              }, 300);
            } catch {
              setErrors((prev) => ({
                ...prev,
                submit: "something went wrong. please try again later",
              }));
            } finally {
              setIsSending(false);
            }
          }}
        >
          <div className="flex flex-col gap-1">
            <input
              name="name"
              type="text"
              placeholder="your name"
              disabled={isSending}
              onChange={() => clearError("name")}
              className={`
                rounded-xl border bg-[var(--tag-bg-color)] px-4 py-3 text-[15px] outline-none transition disabled:cursor-not-allowed disabled:opacity-60
                ${
                  errors.name
                    ? "border-red-500 focus:border-red-500"
                    : "border-[var(--tag-border-color)] focus:border-[var(--line-color)]"
                }
              `}
            />

            {errors.name && (
              <span className="text-[12px] text-red-400">{errors.name}</span>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <input
              name="email"
              type="email"
              placeholder="email"
              disabled={isSending}
              onChange={() => clearError("email")}
              className={`
                rounded-xl border bg-[var(--tag-bg-color)] px-4 py-3 text-[15px] outline-none transition disabled:cursor-not-allowed disabled:opacity-60
                ${
                  errors.email
                    ? "border-red-500 focus:border-red-500"
                    : "border-[var(--tag-border-color)] focus:border-[var(--line-color)]"
                }
              `}
            />

            {errors.email && (
              <span className="text-[12px] text-red-400">{errors.email}</span>
            )}
          </div>

          <input
            name="projectType"
            type="text"
            placeholder="project type"
            disabled={isSending}
            className="rounded-xl border border-[var(--tag-border-color)] bg-[var(--tag-bg-color)] px-4 py-3 text-[15px] outline-none transition focus:border-[var(--line-color)] disabled:cursor-not-allowed disabled:opacity-60"
          />

          <div className="flex flex-col gap-1">
            <textarea
              name="message"
              placeholder="tell me about your project"
              rows={5}
              disabled={isSending}
              onChange={() => clearError("message")}
              className={`
                resize-none rounded-xl border bg-[var(--tag-bg-color)] px-4 py-3 text-[15px] outline-none transition disabled:cursor-not-allowed disabled:opacity-60
                ${
                  errors.message
                    ? "border-red-500 focus:border-red-500"
                    : "border-[var(--tag-border-color)] focus:border-[var(--line-color)]"
                }
              `}
            />

            {errors.message && (
              <span className="text-[12px] text-red-400">
                {errors.message}
              </span>
            )}
          </div>

          {errors.submit && (
            <span className="text-[12px] text-red-400">{errors.submit}</span>
          )}

          <button
            type="submit"
            disabled={isSending}
            className="mt-2 rounded-full border border-[var(--line-color)] px-8 py-3 text-[16px] font-medium lowercase transition hover:bg-[var(--text-color)] hover:text-[var(--bg-color)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSending ? "sending..." : "send request"}
          </button>
        </form>
      </div>
    </div>
  );
}