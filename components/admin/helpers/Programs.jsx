import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";

import { collection, addDoc } from "firebase/firestore";

import { GrChapterAdd } from "react-icons/gr";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebase";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Image from "next/image";
import InnerPrograms from "./InnerPrograms";

const Programs = () => {
  let [option, setOption] = useState("add");

  const setHandle = (e) => {
    setOption(e.target.id);
  };

  return (
    <>
      <div>
        <div>
          <div id="innerOptions" className="options flex gap-x-3">
            <button
              onClick={() => setOption("add")}
              className="flex items-center gap-x-2 px-3 py-1 rounded bg-green-600 text-sm"
            >
              أضف برنامج
              <GrChapterAdd />
            </button>
            <button
              id="international"
              className={option === "international" ? "btn active" : "btn"}
              onClick={(e) => setHandle(e)}
            >
              الوجهات الدولية
            </button>
            <button
              id="domestic"
              className={option === "domestic" ? "btn active" : "btn"}
              onClick={(e) => setHandle(e)}
            >
              الوجهات المحلية
            </button>
            <button
              id="visa"
              className={option === "visa" ? "btn active" : "btn"}
              onClick={(e) => setHandle(e)}
            >
              التأشيرات
            </button>
          </div>

          <div className="sec">
            {option === "international" ? (
              <InnerPrograms category="international" />
            ) : option === "domestic" ? (
              <InnerPrograms category="domestic" />
            ) : option === "visa" ? (
              <InnerPrograms category="visa" />
            ) : option === "add" ? (
              <AddNewProgram category="add" />
            ) : (
              <p>something is wrong!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Programs;

const AddNewProgram = (props) => {
  const router = useRouter();
  const [progress, setProgress] = useState();
  const [loading, setLoading] = useState(false);

  const { quill, quillRef } = useQuill();
  const cateRef = useRef();
  const titleRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();

  const addProg = async (e) => {
    e.preventDefault();

    const file = imageRef.current;
    const image = file.files[0];

    const category = cateRef.current.value;
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const content = quill.root.innerHTML;

    const createdAt = new Date().getTime();

    if (
      category !== "" &&
      title !== "" &&
      description !== "" &&
      content !== "" &&
      image !== undefined
    ) {
      // upload files
      // await uploadFile(image);
      setLoading(true);
      const path = `/files/programs/${createdAt}_${image.name}`;
      const storageRef = ref(storage, path);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (err) => console.log(err),
        (snapshot) => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) =>
            addDoc(collection(db, "programs"), {
              createdAt,
              title,
              image: url,
              description,
              content,
              category,
              path,
            }).then((res) => {
              toast.success("تمت الاضافة بنجاح");
              setTimeout(() => {
                router.reload();
              }, 2000);
            })
          );
        }
      );
    } else {
      toast.error("حقول فارغة !");
    }
  };

  // const uploadFile = async (file) => {
  //   const time = new Date().getTime();
  //   if (!file) return;
  //   const storageRef = ref(
  //     storage,
  //     `/files/programs/${time + "_" + file.name}`
  //   );
  //   const uploadTask = uploadBytesResumable(storageRef, file);

  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {
  //       const prog = Math.round(
  //         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //       );
  //       setProgress(prog);
  //     },
  //     (err) => console.log(err),
  //     (snapshot) => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((url) =>
  //         setDownloadUrl(url)
  //       );
  //     }
  //   );
  //
  // };

  return (
    <div className="px-2 py-4">
      <div className="w-full flex justify-center">
        <h3 className="font-semibold text-lg md:text-xl">اضافة برنامج</h3>
      </div>
      <form id="addForm" onSubmit={(e) => addProg(e)} className="mt-2 ">
        <div>
          <label htmlFor="">يتبع ل :</label>
          <select name="category" ref={cateRef}>
            <option value="">اختر</option>
            <option value="international">الوجهات الدولية</option>
            <option value="domestic">الوجهات المحلية</option>
            <option value="visa">التأشيرات</option>
          </select>
        </div>
        <div>
          <input type="text" placeholder="العنوان..." ref={titleRef} />
        </div>
        <div>
          <label htmlFor="">الصورة : {progress && progress + " %"}</label>
          <input type="file" placeholder="الصورة..." ref={imageRef} />
        </div>
        <div>
          <textarea rows="3" placeholder="وصف مختصر..." ref={descriptionRef} />
        </div>
        <label htmlFor="">كامل النص :</label>
        <div className="" dir="ltr">
          <div style={{ height: 300 }}>
            <div ref={quillRef} />
          </div>
        </div>
        <br />
        <div className="w-full flex justify-center mt-10 mb-4">
          <button
            type="submit"
            className="btn btn-main flex items-center gap-x-1"
          >
            حفظ
            {loading && (
              <Image src="/icons/loading.gif" alt="/" width="15" height="15" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
