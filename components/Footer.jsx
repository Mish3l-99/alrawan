import Link from "next/link";
import React from "react";

import { FiFacebook } from "react-icons/fi";
import { FaFacebookSquare, FaInstagram, FaTwitterSquare } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import Image from "next/image";

const Footer = () => {
  return (
    <div id="footer" className="w-full bg-gray-900">
      <div className="container py-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15373.277455519661!2d32.53803312415201!3d15.574576596902103!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x168e91d1cafd18ab%3A0xc19828ca8a51c55c!2sAl%20Amarat%2C%20Khartoum%2C%20Sudan!5e0!3m2!1sen!2s!4v1665915033877!5m2!1sen!2s"
              // width="600"
              height="170"
              className="w-full"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 text-gray-400 font-semibold">
            <h6 className="border-b-2 border-red-600 w-fit mb-4 font-bold">
              Address
            </h6>
            <p>Alamarat 15th street.</p>
            <p>P.O. Box: 11311.</p>
            <p>Khartoum.</p>
            <p className="mt-2">Tel: +249 183 480224.</p>
            <p>Fax: +249 183 466 383.</p>
            {/* <p>hhh</p> */}
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 flex flex-col md:block items-center">
            <div className="hover:scale-105 duration-500 w-fit hover:fill-blue-600">
              <Image
                alt="/"
                src="/logo/logo-footer.png"
                height={62}
                width={62}
              />
            </div>
            <p className="text-gray-500 font-semibold">Alrawan Marketing Co.</p>
            <div className="">
              <div className="flex max-w-[260px] my-4">
                <a href="www.fb.com/">
                  <FaFacebookSquare
                    className="mr-2 hover:text-[#3464b6] duration-500"
                    size={30}
                  />
                </a>
                <a href="www.instagram.com/">
                  <FaInstagram
                    className="mr-2 hover:text-[#3464b6] duration-500"
                    size={30}
                  />
                </a>
                <a href="www.twitter.com/">
                  <FaTwitterSquare
                    className="mr-2 hover:text-[#3464b6] duration-500"
                    size={30}
                  />
                </a>
              </div>
            </div>
            <p className="text-gray-500 font-semibold">
              All Rights Reserved ©, 2022
            </p>
          </div>
        </div>
      </div>
      {/* <div className=" text-gray-400 text-md mt-4 w-full flex justify-center items-center py-2 bg-black">
        <p>All Rights Reserved ©, 2022</p>
      </div> */}
    </div>
  );
};

export default Footer;
