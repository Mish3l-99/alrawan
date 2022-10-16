import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div
      className="mt-4 flex h-full w-full justify-center items-center"
      dir="ltr"
    >
      <Image alt="" src="/icons/loading.gif" height={40} width={40} />
    </div>
  );
};

export default Loading;
