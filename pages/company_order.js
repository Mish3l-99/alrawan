import React from "react";
import CompanyOrder from "../components/CompanyOrder";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Social from "../components/Social";

const CompanyOrderPage = () => {
  return (
    <div className="w-full h-auto">
      <Navbar />
      <CompanyOrder />
      <Social />
      <Footer />
    </div>
  );
};

export default CompanyOrderPage;
