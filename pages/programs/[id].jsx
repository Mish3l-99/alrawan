import { useRouter } from "next/router";
import React from "react";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Social from "../../components/Social";
import Footer from "../../components/Footer";
import ProgramDetails from "../../components/ProgramDetails";
import Contact from "../../components/Contact";

const ProgramPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className="w-full h-auto">
      <Navbar />
      {/* <Hero /> */}
      <ProgramDetails id={id} />
      <Contact />
      <Social />
      <Footer />
    </div>
  );
};

export default ProgramPage;
