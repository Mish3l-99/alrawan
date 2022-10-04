import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import "quill/dist/quill.snow.css";

import { collection, query, orderBy, where, getDocs } from "firebase/firestore";

import { db } from "../../../firebase";
import Loading from "../../helpers/Loading";

import { BiShowAlt } from "react-icons/bi";

const Requests = () => {
  let [option, setOption] = useState("normal");

  const setHandle = (e) => {
    setOption(e.target.id);
  };

  return (
    <>
      <div>
        <div>
          <div id="innerRequests" className="options flex gap-x-3">
            <button
              id="normal"
              className={option === "normal" ? "btn active" : "btn"}
              onClick={(e) => setHandle(e)}
            >
              طلبات
            </button>
            <button
              id="complaint"
              className={option === "complaint" ? "btn active" : "btn"}
              onClick={(e) => setHandle(e)}
            >
              شكاوى
            </button>
            <button
              id="company"
              className={option === "company" ? "btn active" : "btn"}
              onClick={(e) => setHandle(e)}
            >
              طلبات الشركات
            </button>
            <button
              id="employment"
              className={option === "employment" ? "btn active" : "btn"}
              onClick={(e) => setHandle(e)}
            >
              توظيف
            </button>
          </div>

          <div className="sec">
            {option === "normal" ? (
              <InnerRequests category="normal" />
            ) : option === "complaint" ? (
              <InnerRequests category="complaint" />
            ) : option === "company" ? (
              <InnerRequests category="company" />
            ) : option === "employment" ? (
              <InnerRequests category="employment" />
            ) : (
              <p>something is wrong!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Requests;

export const InnerRequests = (props) => {
  const [orders, setOrders] = useState();
  let [isOpen, setIsOpen] = useState(false);

  let [toOpen, setToOpen] = useState(null);

  function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var year = a.getFullYear();
    var month = a.getMonth();
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var time = year + "/" + month + "/" + date + " - " + hour + ":" + min;
    return time;
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const showDetails = (e, order) => {
    e.preventDefault();
    setToOpen(null);
    setToOpen(order);
    openModal();
  };

  useEffect(() => {
    setOrders(null);
    const requestsQ = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc"),
      where("type", "==", props.category)
    );
    getDocs(requestsQ).then((data) => {
      setOrders(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, [props.category]);

  if (!orders) {
    return (
      <div className="mt-4 flex w-full justify-center" dir="ltr">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div>
        <table
          id="requestsTable"
          dir="rtl"
          class="table-fixed bg-gray-100 w-full"
        >
          <thead>
            <tr>
              <th>الاسم</th>
              <th>رقم الجوال</th>
              <th>تفاصيل</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i}>
                <td>{order.name}</td>
                <td>{order.phone}</td>
                <td>
                  <button
                    onClick={(e) => showDetails(e, order)}
                    className="btn text-sm"
                  >
                    عرض
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

          {!toOpen ? (
            <Loading />
          ) : (
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
                      تفاصيل الطلب
                    </Dialog.Title>
                    <hr className="mb-4" />
                    {}

                    {Object.entries(toOpen).map((pair, i) => {
                      // console.log(pair);

                      let content = pair[1];

                      if (typeof pair[1] === "object") {
                        content = pair[1].title;
                      }

                      let full_content;

                      switch (pair[0]) {
                        case "city":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">المدينة :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "destination":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">الوجهة :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "name":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">الاسم :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "phone":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">الجوال :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "program":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">البرنامج المحدد :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "complaint":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">الشكوى :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "createdAt":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">التاريخ :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {timeConverter(content)}
                              </p>
                            </div>
                          );
                          break;
                        case "company_name":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">اسم الشركة :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "description":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">الرسالة :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "email":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">الايميل :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "age":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">العمر :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "experience":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">الخبرة :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "gender":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">الجنس :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "job":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">الوظيفة :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "nationality":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">الجنسية :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "quali":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">المؤهلات :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "cv":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">السيرة الذاتية :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                <a
                                  href={content}
                                  className="py-1 px-2 bg-green-600 text-white flex gap-x-2 items-center w-fit rounded"
                                  download
                                >
                                  عرض
                                  <BiShowAlt />
                                </a>
                              </p>
                            </div>
                          );
                          break;

                        default:
                          full_content = null;
                      }

                      return full_content;
                    })}

                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex gap-x-2 justify-center items-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        الرجوع
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          )}
        </Dialog>
      </Transition>
    </>
  );
};
