import Image from "next/image";
import React from "react";

const Brands = () => {
  return (
    <div className="py-3">
      <div className="container">
        <div className="max-w-[500px] mx-auto px-6 md:px-2 flex justify-between items-center">
          <div className="h-[20px] md:h-[40px] w-[40px] md:w-[80px] relative">
            <Image
              alt="/"
              src="/brands/c.png"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="h-[20px] md:h-[40px] w-[50px] md:w-[110px] relative">
            <Image
              alt="/"
              src="/brands/a.png"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="h-[20px] md:h-[40px] w-[40px] md:w-[80px] relative">
            <Image
              alt="/"
              src="/brands/b.png"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brands;
