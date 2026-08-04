import { ArrowUp } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="site-footer">
      <Image
        src="/logoWhite.svg"
        alt="EY"
        width={44}
        height={30}
        className="footer-logo-dark"
      />
      <Image
        src="/logoBlack.svg"
        alt="EY"
        width={44}
        height={30}
        className="footer-logo-light"
      />
      <span>© {new Date().getFullYear()}</span>
      <span>
        built by{" "}
        <a href="https://github.com/helliong" target="_blank">
          helliong
        </a>
      </span>
      <a href="#home">
        back to top <ArrowUp size={15} aria-hidden="true" />
      </a>
    </footer>
  );
}
