import { ArrowUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  topHref?: string;
};

/** Renders site credits, theme-aware branding, and the back-to-top link. */
export default function Footer({ topHref = "#home" }: Props) {
  return (
    <footer className="site-footer">
      <div className="footer-meta">
        <Link href="/" className="footer-brand" aria-label="Portfolio home">
          <Image
            src="/logoWhite.svg"
            alt="EY"
            width={52}
            height={36}
            className="footer-logo-dark"
          />
          <Image
            src="/logoBlack.svg"
            alt="EY"
            width={52}
            height={36}
            className="footer-logo-light"
          />
        </Link>
        <span className="footer-copyright">© {new Date().getFullYear()}</span>
      </div>
      <span className="footer-credit">
        built by{" "}
        <a href="https://github.com/helliong" target="_blank" rel="noreferrer">
          helliong
        </a>
      </span>
      <div className="footer-links">
        <Link href="/privacy">privacy policy</Link>
        <Link href={topHref}>
          back to top <ArrowUp size={15} aria-hidden="true" />
        </Link>
      </div>
    </footer>
  );
}
