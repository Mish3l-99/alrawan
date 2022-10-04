import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import Loading from "./Loading";

const Carousel = () => {
  const [pics, setPics] = useState();
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

  useEffect(() => {
    getDoc(doc(db, "settings", "slider")).then((res) => {
      setPics(res.data().pictures);
    });
  }, []);

  return (
    <div>
      <div className="w-full h-[600px] relative">
        {!pics || !current ? (
          <Loading />
        ) : (
          <>
            {current && (
              <Image alt="/" src={current} layout="fill" objectFit="cover" />
            )}
          </>
        )}

        <div className="absolute w-full h-full bg-black/40 flex justify-between px-3">
          <div className="dot" onClick={() => goNext()}>
            <GrFormNext />
          </div>
          <div className="dot" onClick={() => goPrev()}>
            <GrFormPrevious />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
