import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import Loading from "./Loading";

const Carousel = () => {
  const [pics, setPics] = useState(["khartoum.webp"]);
  // const [pics, setPics] = useState(["khartoum.webp", "b.jpeg"]);
  const [current, setCurrent] = useState();

  const timeoutRef = useRef(null);
  const delay = 5000;

  const goNext = () => {
    let next;
    pics.indexOf(current) === pics.length - 1
      ? (next = 0)
      : (next = pics.indexOf(current) + 1);

    setCurrent(pics[next]);
  };

  const goPrev = () => {
    let prev;
    pics.indexOf(current) === 0
      ? (prev = pics.length - 1)
      : (prev = pics.indexOf(current) - 1);

    setCurrent(pics[prev]);
  };

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    if (pics) {
      setCurrent(pics[0]);
    }
  }, [pics]);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => goNext(), delay);

    return () => {
      resetTimeout();
    };
  }, [current, pics]);

  return (
    <div>
      <div className="w-full h-[300px] md:h-[350px] relative">
        {!pics || !current ? (
          <Loading />
        ) : (
          <>
            {current && (
              <Image
                alt="/"
                src={"/images/" + current}
                layout="fill"
                objectFit="cover"
              />
            )}
            <div className="absolute w-full h-full bg-black/80 flex justify-between px-3">
              <div className="dot" onClick={() => goNext()}>
                <GrFormPrevious />
              </div>
              <div className="w-full md:px-4 py-12">
                <div className="py-2 md:py-12 md:pl-40">
                  <h2 className="text-gray-300 text-3xl md:text-5xl">
                    Welcome to Alrawan Marketing Co.
                  </h2>
                  <div className="mt-12 md:mt-12">
                    <Link href="/">
                      <div className="w-fit cursor-pointer py-1 px-4 md:py-2 md:px-6 bg-[#3464b6] md:text-2xl rounded text-gray-200 hover:bg-blue-600 hover:scale-105 duration-500">
                        Know More
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="dot" onClick={() => goPrev()}>
                <GrFormNext />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Carousel;
