import React from "react";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { FaHandshake } from "react-icons/fa";

const Values = () => {
  return (
    <div id="values" className="w-full pb-8 bg-gray-400 pt-14">
      <div className="container">
        <div className="titler">
          <h2 className="title">Our Values</h2>
        </div>
        <div className="mt-8 max-w-[800px] mx-auto grid grid-cols-12 gap-y-4 gap-x-4">
          <div className="col-span-12 md:col-span-6 p-6 shadow-lg rounded bg-gray-200 flex flex-col items-center justify-center hover:bg-white duration-300 hover:shadow-2xl">
            <p className="text-[28px] text-green-500 p-4 bg-slate-300 rounded-full">
              <AiFillSafetyCertificate />
            </p>
            <h3 className="font-semibold text-[24px] my-4">Safety First</h3>
            <p className="p-3 bg-green-200 rounded-lg">
              Health and Safety are at the core of all our operations and
              initiatives.
            </p>
          </div>

          <div className="col-span-12 md:col-span-6 p-6 shadow-lg rounded bg-gray-200 flex flex-col items-center justify-center hover:bg-white duration-300 hover:shadow-2xl">
            <p className="text-[28px] text-red-500 p-4 bg-slate-300 rounded-full">
              <FaHandshake />
            </p>
            <h3 className="font-semibold text-[24px] my-4">
              Customer Satisfaction
            </h3>
            <p className="p-3 bg-red-200 rounded-lg">
              Our Customers Regard us as the supplier of choice for their
              chemical needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Values;
