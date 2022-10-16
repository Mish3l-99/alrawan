import Image from "next/image";
import React from "react";
import Carousel from "./helpers/Carousel";

const Hero = () => {
  return (
    <div id="home" className="w-full h-fit">
      <div className="">
        <Carousel />
        {/* <Slider {...settings}>
          <div className="w-full h-[600px] relative">
            <Image
              alt="/"
              src="/images/malaysia-2048x1365.jpg"
              layout="fill"
              objectFit="cover"
            />
          </div>

          <div className="w-full h-[600px] relative">
            <Image
              alt="/"
              src="/images/bigstock-panoramic-aerial-view-of-the-h-271285462.jpg"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Slider> */}
      </div>
    </div>
  );
};

export default Hero;
