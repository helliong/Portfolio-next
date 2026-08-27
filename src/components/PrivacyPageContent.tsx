"use client";

import Footer from "@/components/Footer";
import { usePreferences } from "@/components/PreferencesProvider";
import PreferenceControls from "@/components/PreferenceControls";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/** Explains the limited personal data and browser storage used by the portfolio. */
export default function PrivacyPageContent() {
  const { localizedHref, t } = usePreferences();
  return (
    <main id="privacy-top" className="legal-page">
      <div className="legal-shell">
        <header className="legal-header">
          <Link href={localizedHref("/")} className="legal-brand" aria-label="Portfolio home">
            <Image src="/logoWhite.svg" alt="EY" width={52} height={36} className="footer-logo-dark" />
            <Image src="/logoBlack.svg" alt="EY" width={52} height={36} className="footer-logo-light" />
          </Link>
          <div className="legal-header-actions">
            <PreferenceControls compact />
            <Link href={localizedHref("/")} className="legal-back-link"><ArrowLeft size={15} aria-hidden="true" /> {t("back to portfolio", "назад к портфолио")}</Link>
          </div>
        </header>

        <article className="legal-content">
          <div className="legal-title">
            <span>legal / 01</span>
            <h1>{t("privacy policy", "политика конфиденциальности")}</h1>
            <p>{t("Last updated: August 14, 2026", "Обновлено: 14 августа 2026")}</p>
          </div>

          <div className="legal-sections">
            <section>
              <h2>01 / {t("overview", "обзор")}</h2>
              <p>
                {t("This portfolio is operated by Egor Yakovlev. This policy explains what information is handled when you browse the site or send a project request.", "Это портфолио Егора Яковлева. Здесь описано, какие данные обрабатываются при просмотре сайта и отправке заявки.")}
              </p>
            </section>

            <section>
              <h2>02 / {t("information you provide", "предоставляемые данные")}</h2>
              <p>
                {t("If you use the contact form, the site processes your name, email address, project type and message so that your enquiry can be delivered and answered. Please do not include sensitive personal information in your message.", "При отправке формы сайт обрабатывает имя, email, тип проекта и сообщение, чтобы доставить заявку и ответить на неё. Не указывайте в сообщении чувствительные персональные данные.")}
              </p>
            </section>

            <section>
              <h2>03 / {t("browser storage", "хранилище браузера")}</h2>
              <p>
                {t("The site uses local browser storage to remember your cookie preference, selected language and theme, and a short contact-form cooldown. These records stay on your device. Advertising and analytics cookies are not used.", "Сайт использует локальное хранилище браузера, чтобы помнить выбор cookies, язык, тему и короткую паузу формы обратной связи. Эти записи остаются на вашем устройстве. Рекламные и аналитические cookies не используются.")}
              </p>
            </section>

            <section>
              <h2>04 / {t("service providers", "поставщики услуг")}</h2>
              <p>
                {t("Contact requests are delivered using Resend. Hosting providers may process limited technical data, such as IP addresses and request logs, for security and reliable delivery. Their own privacy terms apply.", "Заявки доставляются через Resend. Хостинг-провайдеры могут обрабатывать ограниченные технические данные, например IP-адреса и журналы запросов, для безопасности и надёжной работы. Применяются их собственные условия конфиденциальности.")}
              </p>
            </section>

            <section>
              <h2>05 / {t("retention and security", "хранение и безопасность")}</h2>
              <p>
                {t("Enquiry data is kept only as long as reasonably necessary to respond and protect the site. Reasonable safeguards are used, but no internet transmission or storage method is completely secure.", "Данные заявки хранятся только столько, сколько разумно необходимо для ответа и защиты сайта. Применяются разумные меры безопасности, но ни один способ передачи или хранения данных в интернете не гарантирует абсолютную защиту.")}
              </p>
            </section>

            <section>
              <h2>06 / {t("your choices", "ваш выбор")}</h2>
              <p>
                {t("You can decline optional storage in the cookie notice and clear this site's local storage in your browser at any time. You may also ask to access, correct or delete personal information connected with an enquiry, subject to applicable law.", "Вы можете отклонить необязательное хранение данных и в любой момент очистить локальное хранилище сайта в браузере. Также можно запросить доступ, исправление или удаление персональных данных, связанных с заявкой, в рамках применимого закона.")}
              </p>
            </section>

            <section>
              <h2>07 / {t("contact", "контакты")}</h2>
              <p>
                {t("For privacy questions or requests, email", "По вопросам конфиденциальности пишите на")}{" "}
                <a href="mailto:saoffabg@gmail.com">saoffabg@gmail.com</a>.
              </p>
            </section>
          </div>
        </article>

        <Footer topHref="#privacy-top" />
      </div>
    </main>
  );
}

