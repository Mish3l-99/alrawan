import Image from "next/image";
import React from "react";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

const Social = () => {
  return (
    <div className="relative w-full min-h-[350px]">
      <div className="">
        <Image alt="/" src="/images/map.jpg" objectFit="cover" layout="fill" />
      </div>
      <div className="absolute top-0 left-0 bg-white/90 w-full h-full py-12">
        <div className="container">
          <h3 className="soci">كن على اتصال معنا</h3>
          <br />
          <h3 className="soci text-[#d61f35]">
            تابعنا على قنوات التواصل الإجتماعي ..
          </h3>
          <div className="mt-12 flex flex-row justify-end medias gap-x-4">
            <div>
              <FiFacebook size={30} />
            </div>
            <div>
              <FaInstagram size={30} />
            </div>
            <div>
              <BsTwitter size={30} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;
