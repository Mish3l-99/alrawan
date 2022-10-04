import React from "react";
import Complaint from "../components/Complaint";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Social from "../components/Social";

const ComplaintPage = () => {
  return (
    <div className="w-full h-auto">
      <Navbar />
      <Complaint />
      <Social />
      <Footer />
    </div>
  );
};

export default ComplaintPage;
