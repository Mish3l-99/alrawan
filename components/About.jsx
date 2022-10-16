import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const About = () => {
  return (
    <div id="about" className="w-full py-5">
      <div className="container">
        <div className="titler">
          <h2 className="title">About Us</h2>
        </div>
        <div className="grid grid-cols-12 gap-y-8 gap-x-4">
          <div className="col-span-12 md:col-span-6">
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="bg-slate-200 rounded-md p-4 shadow-lg text-md md:text-lg"
            >
              ALRAWAN Marketing co. is one of the largest chemical distributors
              in Sudan. A family business established in 1998 by Mr.
              Abdelrahaman Osman (Chairman & CEO). For more than 20 years we’ve
              been serving our customers with a wide range of chemicals and raw
              materials needs for a variety of industries with the highest
              safety standards and customer service.
            </motion.p>
          </div>
          <div className="col-span-12 md:col-span-6 flex justify-center">
            <div className="w-[400px] h-[200px] relative">
              <Image
                alt="/"
                src="/images/b.jpeg"
                // src="/images/lines.png"
                layout="fill"
                objectFit="cover"
                className="rounded shadow-md hover:scale-95 duration-500 ease-out"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
