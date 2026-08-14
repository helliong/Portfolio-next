import Footer from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy policy | Egor Yakovlev",
  description: "How this portfolio handles personal data and browser storage.",
};

/** Explains the limited personal data and browser storage used by the portfolio. */
export default function PrivacyPage() {
  return (
    <main id="privacy-top" className="legal-page">
      <div className="legal-shell">
        <header className="legal-header">
          <Link href="/" className="legal-brand" aria-label="Portfolio home">
            <Image src="/logoWhite.svg" alt="EY" width={52} height={36} className="footer-logo-dark" />
            <Image src="/logoBlack.svg" alt="EY" width={52} height={36} className="footer-logo-light" />
          </Link>
          <Link href="/" className="legal-back-link">
            <ArrowLeft size={15} aria-hidden="true" /> back to portfolio
          </Link>
        </header>

        <article className="legal-content">
          <div className="legal-title">
            <span>legal / 01</span>
            <h1>privacy policy</h1>
            <p>Last updated: August 14, 2026</p>
          </div>

          <div className="legal-sections">
            <section>
              <h2>01 / overview</h2>
              <p>
                This portfolio is operated by Egor Yakovlev. This policy explains what
                information is handled when you browse the site or send a project request.
              </p>
            </section>

            <section>
              <h2>02 / information you provide</h2>
              <p>
                If you use the contact form, the site processes your name, email address,
                project type and message so that your enquiry can be delivered and answered.
                Please do not include sensitive personal information in your message.
              </p>
            </section>

            <section>
              <h2>03 / browser storage</h2>
              <p>
                The site uses local browser storage to remember your cookie preference and a
                short contact-form cooldown. These records stay on your device and support the
                site&apos;s basic operation. The site does not currently use advertising or
                analytics cookies.
              </p>
            </section>

            <section>
              <h2>04 / service providers</h2>
              <p>
                Contact requests are delivered using Resend. Hosting and infrastructure
                providers may also process limited technical data, such as IP addresses and
                request logs, for security and reliable delivery. Their handling is governed by
                their own privacy terms.
              </p>
            </section>

            <section>
              <h2>05 / retention and security</h2>
              <p>
                Enquiry data is kept only as long as reasonably necessary to respond, maintain
                business records and protect the site. Reasonable safeguards are used, but no
                internet transmission or storage method is completely secure.
              </p>
            </section>

            <section>
              <h2>06 / your choices</h2>
              <p>
                You can decline optional storage in the cookie notice. The site still records
                that choice and may use essential storage for form operation. You can clear this
                site&apos;s local storage in your browser at any time. You may also ask to access,
                correct or delete personal information connected with an enquiry, subject to
                applicable law.
              </p>
            </section>

            <section>
              <h2>07 / contact</h2>
              <p>
                For privacy questions or requests, email{" "}
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
