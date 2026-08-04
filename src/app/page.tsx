import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import WhatICanDo from "@/components/WhatICanDo";

export default function Home() {
  return (
    <main className="portfolio-site font-noto">
      <div className="portfolio-shell">
        <Header />
        <Projects />
        <WhatICanDo />
        <About />
        <Process />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
