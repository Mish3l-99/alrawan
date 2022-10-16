import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { GoTelescope } from "react-icons/go";
import { BsArrowReturnRight } from "react-icons/bs";

const Vision = () => {
  return (
    <div id="vision" className="w-full py-8 bg-gray-300 mt-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <span className="text-red-700 text-3xl">
            <GoTelescope />
          </span>
          <p className="text-[17px] py-1 px-2 bg-gray-200 rounded">
            To be competitive leaders in chemical trading both locally and
            globally providing our customers the safest, most efficient, and
            cost-effective means.
          </p>
        </div>

        <div className="flex space-x-2 mt-2">
          <span className="text-[25px] md:text-[30px]">
            <BsArrowReturnRight />
          </span>
          <h2 className="text-[#234a8e]">Our Vision</h2>
        </div>
      </div>
    </div>
  );
};

export default Vision;
