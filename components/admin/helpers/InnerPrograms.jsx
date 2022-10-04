import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db, storage } from "../../../firebase";
import Link from "next/link";
import Image from "next/image";
import { BsFillTrashFill } from "react-icons/bs";
import { deleteObject, ref } from "firebase/storage";

const InnerPrograms = (props) => {
  const [programs, setPrograms] = useState();
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    setPrograms(null);
    const programsQ = query(
      collection(db, "programs"),
      orderBy("createdAt", "desc"),
      where("category", "==", props.category)
    );
    getDocs(programsQ).then((data) => {
      setPrograms(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, [props.category, deleted]);

  if (!programs) {
    return (
      <div className="mt-4 flex w-full justify-center" dir="ltr">
        Loading...
      </div>
    );
  }

  const deleteProg = async (id, path) => {
    setDeleted(true);
    const imageRef = ref(storage, path);
    await deleteObject(imageRef).then(() => console.log("image deleted!", id));

    const userDoc = doc(db, "programs", id);
    await deleteDoc(userDoc);
    setDeleted(false);
  };

  return (
    <div className=" mt-4 grid grid-cols-12 gap-4">
      {programs.map((prog, index) => (
        <div
          key={index}
          className="col-span-12 md:col-span-6 lg:col-span-3 shadow-lg duration-500 hover:shadow-2xl"
        >
          <h4 className="w-fit mx-auto">{prog.title}</h4>
          <div className="w-full h-[200px] relative">
            <div>
              <Image
                className="cursor-pointer hover:scale-105 duration-500"
                alt="/"
                src={prog.image}
                layout="fill"
              />
            </div>
            <div className="absolute bottom-0 left-0 flex justify-between items-center w-full">
              <Link href={`/programs/${prog.id}`}>
                <button className=" text-sm py-1 px-2 bg-blue-700 text-white hover:bg-blue-900">
                  عرض
                </button>
              </Link>
              <button
                onClick={() => deleteProg(prog.id, prog.path)}
                className="py-1 px-2 bg-red-700 text-white hover:bg-red-900"
              >
                <BsFillTrashFill size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InnerPrograms;
