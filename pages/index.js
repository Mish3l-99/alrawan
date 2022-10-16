import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Vision from "../components/Vision";
import About from "../components/About";
import Values from "../components/Values";
import Brands from "../components/Brands";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Alrawan Marketing Co.</title>
        <meta
          name="description"
          content="ALRAWAN Marketing co. is one of the largest chemical distributors in Sudan"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className="w-full h-auto">
        <Navbar />
        <Hero />
        <About />
        <Vision />
        <Values />
        <Contact />
        <Brands />
        {/* <Social /> */}
        <Footer />
      </main>

      <footer className=""></footer>
    </div>
  );
}
