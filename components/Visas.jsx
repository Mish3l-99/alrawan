import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Destination from "./helpers/Destination";
import Loading from "./helpers/Loading";

import { db } from "../firebase";

const Visas = () => {
  const [programs, setPrograms] = useState();

  useEffect(() => {
    setPrograms(null);
    const programsQ = query(
      collection(db, "programs"),
      orderBy("createdAt", "desc"),
      where("category", "==", "visa")
    );
    getDocs(programsQ).then((data) => {
      setPrograms(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, []);

  return (
    <div className="w-full py-6">
      <div className="container">
        <div className="w-full">
          <div className="mx-auto w-fit flex items-center flex-col">
            <h2 className="mx-auto w-fit">التاشيرات</h2>
            <Image alt="/" src="/icons/divider.png" width={200} height={10} />
          </div>
          <br />
          {!programs ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-12 gap-x-2 gap-y-8 mt-8">
              {/* destinations */}
              {programs.map((prog, i) => (
                <Destination key={i} prog={prog} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Visas;
