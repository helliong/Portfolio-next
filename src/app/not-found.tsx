import Footer from "@/components/Footer";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/** Renders the fallback shown when a route cannot be found. */
export default function NotFound() {
  return (
    <main id="not-found-top" className="not-found-page">
      <div className="not-found-shell">
        <header className="legal-header">
          <Link href="/" className="legal-brand" aria-label="Portfolio home">
            <Image
              src="/logoWhite.svg"
              alt="EY"
              width={52}
              height={36}
              className="footer-logo-dark"
              priority
            />
            <Image
              src="/logoBlack.svg"
              alt="EY"
              width={52}
              height={36}
              className="footer-logo-light"
              priority
            />
          </Link>
          <span className="not-found-status">
            <span aria-hidden="true" /> error / 404
          </span>
        </header>

        <section className="not-found-content">
          <div className="not-found-code" aria-hidden="true">
            <span>4</span>
            <span className="not-found-zero">0</span>
            <span>4</span>
          </div>

          <div className="not-found-message">
            <span className="not-found-kicker">lost in the stack / 01</span>
            <h1>
              page not found
              <span className="blink-cursor" aria-hidden="true" />
            </h1>
            <p>
              The page may have moved, been removed, or never existed. Let&apos;s get you
              back somewhere useful.
            </p>

            <div className="not-found-actions">
              <Link href="/" className="not-found-primary-action">
                <ArrowLeft size={16} aria-hidden="true" /> back home
              </Link>
              <Link href="/projects" className="not-found-secondary-action">
                view projects <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <Footer topHref="#not-found-top" />
      </div>
    </main>
  );
}
