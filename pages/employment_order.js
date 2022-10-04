import React from "react";
import EmploymentOrder from "../components/EmploymentOrder";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Social from "../components/Social";

const EmploymentOrderPage = () => {
  return (
    <div className="w-full h-auto">
      <Navbar />
      <EmploymentOrder />
      <Social />
      <Footer />
    </div>
  );
};

export default EmploymentOrderPage;
