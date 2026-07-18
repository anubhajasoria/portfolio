import Providers from "@/components/Providers";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Programs from "@/components/Programs";
import Collage from "@/components/Collage";
import Stats from "@/components/Stats";
import Skills from "@/components/Skills";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <Providers>
      <main>
        <Hero />
        <About />
        <Programs />
        <Collage />
        <Stats />
        <Skills />
        <Footer />
      </main>
    </Providers>
  );
}
