import About from "@/components/About";
import BackgroundClouds from "@/components/BackgroundClouds";
import Cases from "@/components/Cases";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="relative overflow-hidden bg-[var(--bg-color)] text-[var(--text-color)]">
      <BackgroundClouds />

      <div className="page-container relative z-10 font-noto">
        <Header />
        <Cases />
        <Projects />
        <About />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}