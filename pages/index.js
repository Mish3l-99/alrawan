import Head from "next/head";
import Image from "next/image";
import Social from "../components/Social";
import Internationals from "../components/Internationals";
import Navbar from "../components/Navbar";
import Domestic from "../components/Domestic";
import Visas from "../components/Visas";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>app</title>
        <meta name="description" content="global visa app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-full h-auto">
        <Navbar />
        <Hero />
        <Internationals />
        <Domestic />
        <Visas />
        <Contact />
        <Social />
        <Footer />
      </main>

      <footer className=""></footer>
    </div>
  );
}
