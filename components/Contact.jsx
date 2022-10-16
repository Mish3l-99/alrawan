import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { db } from "../firebase";

const Contact = () => {
  let initialForm = {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    read: false,
  };
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(initialForm);

  const setOnChange = (e) => {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  };

  const submitOrder = (e) => {
    e.preventDefault();

    const createdAt = new Date().getTime();

    if (
      form.name !== "" &&
      form.email !== "" &&
      form.phone !== "" &&
      form.subject !== "" &&
      form.message !== ""
    ) {
      setLoading(true);
      let order = { ...form, createdAt };

      addDoc(collection(db, "data"), order).then((res) => {
        toast.success("Sent Successfully!");
        setForm(initialForm);
        setLoading(false);
      });

      console.log(order);
    } else {
      toast.error("Empty Fields!");
    }
  };

  return (
    <div id="contact" className="w-full relative ">
      <div className="w-full h-[550px] relative bg-white/90">
        <Image alt="/" src="/images/map.jpg" layout="fill" objectFit="cover" />
      </div>
      <div className="absolute top-0 bottom-0 left-0 right-0 w-full bg-white/90">
        <div className="container">
          <div className="titler pt-6">
            <h2 className="title">Contact Us</h2>
          </div>
          <form
            action=""
            onSubmit={(e) => submitOrder(e)}
            className="max-w-[800px] pb-8"
            id="forma"
          >
            <div className="form-group">
              <input
                onChange={(e) => setOnChange(e)}
                value={form.name}
                name="name"
                type="text"
                placeholder="Name..."
              />
            </div>
            <div className="form-group">
              <input
                onChange={(e) => setOnChange(e)}
                value={form.email}
                name="email"
                type="email"
                placeholder="Email..."
              />
            </div>
            <div className="form-group">
              <input
                onChange={(e) => setOnChange(e)}
                value={form.phone}
                name="phone"
                type="phone"
                placeholder="Phone..."
              />
            </div>
            <div className="form-group">
              <input
                onChange={(e) => setOnChange(e)}
                value={form.subject}
                name="subject"
                type="text"
                placeholder="Subject..."
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                rows="5"
                value={form.message}
                onChange={(e) => setOnChange(e)}
                placeholder="Message..."
              ></textarea>
            </div>

            <label className="text-[#d61f35] text-[12px]">
              *We will get back to you as soon as possible, you can email us at{" "}
              <a
                className="text-blue-600"
                href="mailto:alrawan59@yahoo-co.uk"
                target="_blank"
                rel="noopener noreferrer"
              >
                alrawan59@yahoo-co.uk
              </a>{" "}
              as well.
            </label>
            <br />
            <div className="mt-4 flex items-center justify-center">
              <button className="mx-auto btn btn-main flex items-center gap-x-2">
                Send
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
      </div>
    </div>
  );
};

export default Contact;
