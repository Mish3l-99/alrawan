import Image from "next/image";
import Link from "next/link";
import React from "react";

const Destination = (props) => {
  const { prog } = props;
  return (
    <div className="col-span-12 md:col-span-6 lg:col-span-3 shadow-lg duration-500 hover:shadow-2xl">
      <h4 className="w-fit mx-auto">{prog.title}</h4>
      <div className="w-full h-[200px] relative">
        <Link href={`/programs/${prog.id}`}>
          <div>
            <Image
              className="cursor-pointer hover:scale-105 duration-500"
              alt="/"
              src={prog.image}
              layout="fill"
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Destination;
