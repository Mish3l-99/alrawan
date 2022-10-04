import React from "react";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Social from "../components/Social";

const ContactPage = () => {
  return (
    <div className="w-full h-auto">
      <Navbar />
      <Contact />
      <Social />
      <Footer />
    </div>
  );
};

export default ContactPage;
