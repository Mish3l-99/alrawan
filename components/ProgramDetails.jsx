import React, { useEffect, useState } from "react";
import { getDoc, doc } from "firebase/firestore";
import { BsArrowLeftSquareFill } from "react-icons/bs";

import Loading from "./helpers/Loading";

import { db } from "../firebase";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { setGProgram, resetGProgram } from "../state/program";

const ProgramDetails = (props) => {
  const { id } = props;
  const dispatch = useDispatch();

  const [program, setProgram] = useState();
  useEffect(() => {
    // getDoc
    getDoc(doc(db, "programs", id)).then((data) => setProgram(data.data()));
  }, []);

  useEffect(() => {
    if (program) {
      dispatch(setGProgram(program));
    }

    // reset when component unmounts
    return () => {
      dispatch(resetGProgram());
    };
  }, [program]);

  return (
    <div className="w-full py-6">
      <div className="container">
        {!program ? (
          <Loading />
        ) : (
          <div>
            <div className="flex gap-x-3 items-center">
              <BsArrowLeftSquareFill size={27} className="text-[#d61f35]" />
              <h2>{program.title}</h2>
            </div>
            <div className="w-full min-h-[300px] md:min-h-[500px] relative mt-4">
              <Image
                alt="/"
                src={program.image}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="mt-4 bg-gray-200 p-4 rounded-md">
              <p className="font-semibold text-lg md:text-xl">
                {program.description}
              </p>
            </div>

            <div className="mt-8">
              <div dangerouslySetInnerHTML={{ __html: program.content }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramDetails;
