import About from "@/components/About";
import BackgroundClouds from "@/components/BackgroundClouds";
import Cases from "@/components/Cases";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden overflow-y-hidden">
      <BackgroundClouds />

      <div className="relative z-10 mx-auto w-full max-w-[1478px] px-[2%] pt-[7vh] font-noto text-[50px] max-md:pt-[2vh] max-md:text-2xl">
        <Header />
        <Cases />
        <Projects />
        <About />
        <Contact />
        <Footer />
        <div className="cloud-five" />
      </div>
    </main>
  );
}
