import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  collection,
  query,
  orderBy,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "../../../firebase";
import Loading from "../../helpers/Loading";

import { BiShowAlt } from "react-icons/bi";

const Requests = () => {
  const [orders, setOrders] = useState();
  let [isOpen, setIsOpen] = useState(false);

  let [updated, setUpdated] = useState(false);

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

  const markAsRead = async (id) => {
    await updateDoc(doc(db, "data", id), { read: true });
    setUpdated(!updated);
  };

  const showDetails = (e, order) => {
    e.preventDefault();
    setToOpen(null);
    setToOpen(order);
    // mark as read
    markAsRead(order.id);
    openModal();
  };

  useEffect(() => {
    setOrders(null);
    const requestsQ = query(
      collection(db, "data"),
      orderBy("createdAt", "desc")
    );
    getDocs(requestsQ).then((data) => {
      setOrders(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, [updated]);

  if (!orders) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <table id="requestsTable" class="table-fixed bg-gray-100 w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr className={order.read ? "" : "not_read"} key={i}>
                <td>{order.name}</td>
                <td>{order.phone}</td>
                <td>
                  <button
                    onClick={(e) => showDetails(e, order)}
                    className="btn text-sm"
                  >
                    show
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
            <div className="fixed inset-0 overflow-y-auto">
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
                  <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-semibold leading-6 text-gray-900 text-lg mb-1"
                    >
                      Deatils
                    </Dialog.Title>
                    <hr className="mb-4" />
                    {Object.entries(toOpen).map((pair, i) => {
                      // console.log(pair);

                      let content = pair[1];
                      let full_content;

                      switch (pair[0]) {
                        case "createdAt":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">Date & Time :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {timeConverter(content)}
                              </p>
                            </div>
                          );
                          break;

                        case "name":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">Name :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "phone":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">Phone :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "email":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">Email :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "subject":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">Subject :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
                              </p>
                            </div>
                          );
                          break;
                        case "message":
                          full_content = (
                            <div key={i}>
                              <h3 className="mt-2">Message :</h3>
                              <p className="p-2 rounded bg-gray-200">
                                {content}
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
                        Back
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

export default Requests;
