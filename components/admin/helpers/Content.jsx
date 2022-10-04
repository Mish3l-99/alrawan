import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useQuill } from "react-quilljs";
import Loading from "../../helpers/Loading";
import { db, storage } from "../../../firebase";
import Image from "next/image";
import toast from "react-hot-toast";
import { Dialog, Transition } from "@headlessui/react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Content = () => {
  const [option, setOption] = useState("general");

  const setHandle = (e) => {
    setOption(e.target.id);
  };

  return (
    <div className="py-4 w-full h-auto">
      <div>
        <div id="innerRequests" className="options flex gap-x-3">
          <button
            id="general"
            className={option === "general" ? "btn active" : "btn"}
            onClick={(e) => setHandle(e)}
          >
            عام
          </button>
          <button
            id="return"
            className={option === "return" ? "btn active" : "btn"}
            onClick={(e) => setHandle(e)}
          >
            سياسة الاسترجاع
          </button>
          <button
            id="use"
            className={option === "use" ? "btn active" : "btn"}
            onClick={(e) => setHandle(e)}
          >
            شروط الإستخدام
          </button>
          <button
            id="certificate"
            className={option === "certificate" ? "btn active" : "btn"}
            onClick={(e) => setHandle(e)}
          >
            الشهادة الضريبية
          </button>
          <button
            id="payment"
            className={option === "payment" ? "btn active" : "btn"}
            onClick={(e) => setHandle(e)}
          >
            طرق الدفع
          </button>
          <button
            id="faq"
            className={option === "faq" ? "btn active" : "btn"}
            onClick={(e) => setHandle(e)}
          >
            الأسئلة الشائعة
          </button>
          <button
            id="about"
            className={option === "about" ? "btn active" : "btn"}
            onClick={(e) => setHandle(e)}
          >
            من نحن
          </button>
        </div>

        <div className="sec">
          {option === "general" ? (
            <GeneralSettings />
          ) : (
            <PageContent page={option} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;

export const PageContent = (props) => {
  const { page } = props;

  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(null);

  useEffect(() => {
    getDoc(doc(db, "settings", "pages_content")).then((data) =>
      setPages(data.data())
    );
  }, [loading]);

  const { quill, quillRef } = useQuill();

  let content = undefined;
  if (pages) {
    content = pages[page];
  }
  useEffect(() => {
    if (quill && content !== undefined) {
      quill.clipboard.dangerouslyPasteHTML(content);
    }
  }, [quill, content]);

  const updatePage = () => {
    setLoading(true);

    const contentValue = quill.root.innerHTML;

    updateDoc(doc(db, "settings", "pages_content"), {
      [page]: contentValue,
    }).then(() => {
      setLoading(false);
      toast.success("تم التعديل بنجاح");
    });

    // console.log(content);
  };

  if (!pages) {
    return <Loading />;
  }

  return (
    <>
      <div className="w-full" dir="ltr">
        <div>
          <div ref={quillRef} />
        </div>
      </div>
      <div className="py-4 w-full">
        <button
          onClick={() => updatePage()}
          className="btn btn-main mx-auto flex items-center gap-x-1"
        >
          حفظ
          {loading && (
            <Image src="/icons/loading.gif" alt="/" width="15" height="15" />
          )}
        </button>
      </div>
    </>
  );
};

export const GeneralSettings = () => {
  const [pics, setPics] = useState();
  let [isOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  let [progress, setProgress] = useState(null);

  let [current, setCurrent] = useState(null);

  const fileRef = useRef();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleOpen(index) {
    setCurrent(index);
    openModal();
  }

  function changeCarouselPic(e) {
    e.preventDefault();

    const file = fileRef.current;
    const image = file.files[0];
    // console.log(image, current);

    if (!image) {
      toast.error("لا يوجد مرفقات!");
      return;
    } else {
      setLoading(true);
    }

    const path = `/files/carousel/${image.name}`;
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
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          let data = [];
          pics.map((pic, i) => {
            i === current ? data.push(url) : data.push(pic);
          });

          updateDoc(doc(db, "settings", "slider"), {
            pictures: data,
          }).then(() => {
            setLoading(false);
            toast.success("تم التعديل بنجاح");
            closeModal();
          });
        });
      }
    );
  }

  useEffect(() => {
    getDoc(doc(db, "settings", "slider")).then((res) => {
      setPics(res.data().pictures);
    });
  }, [loading]);

  if (!pics) {
    return <Loading />;
  } else {
    console.log(pics);
  }

  return (
    <div className="w-full">
      <div>
        <h3 className="font-semibold mb-2">صور العرض :</h3>
        <div className="grid grid-cols-12 gap-4">
          {pics.map((pic, i) => (
            <div key={i} className="col-span-12 lg:col-span-4 relative">
              <div className="w-full h-[270px] relative">
                <Image alt="/" src={pic} layout="fill" objectFit="cover" />
              </div>
              <div className="absolute bottom-0 w-full bg-gray-500 py-1 flex justify-center">
                <button
                  onClick={() => handleOpen(i)}
                  className="text-sm bg-gray-600 text-white rounded hover:text-red-500 mx-auto"
                >
                  تغيير
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for showing details */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto" dir="rtl">
            <div className="flex min-h-fit justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-md bg-white p-6 text-right align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-900 text-lg mb-1"
                  >
                    صور العرض
                  </Dialog.Title>
                  <div>
                    <form className="py-3" action="">
                      <label
                        className="mb-3 flex gap-x-2 items-center"
                        htmlFor=""
                      >
                        اختر ملف :<span>{progress}</span>
                      </label>
                      <input
                        ref={fileRef}
                        className="w-full my-2"
                        type="file"
                      />
                      <hr />
                      <div className="w-full flex justify-center mt-4">
                        <button
                          onClick={(e) => changeCarouselPic(e)}
                          className="btn btn-main text-sm flex items-center gap-x-2"
                        >
                          تحميل
                          {loading && (
                            <Image
                              src="/icons/loading.gif"
                              alt="/"
                              width="15"
                              height="15"
                            />
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};
