import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { db } from "../firebase";

const Complaint = () => {
  const phoneRef = useRef();
  const complaintRef = useRef();
  const nameRef = useRef();

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const submitOrder = (e) => {
    e.preventDefault();
    const phone = phoneRef.current.value;
    const name = nameRef.current.value;
    const complaint = complaintRef.current.value;

    const createdAt = new Date().getTime();

    if (phone !== "" && name !== "" && complaint !== "") {
      setLoading(true);
      let order = {
        phone,
        name,
        complaint,
        type: "complaint",
        createdAt,
      };

      addDoc(collection(db, "orders"), order).then((res) => {
        toast.success("تمت الاضافة بنجاح");
        setTimeout(() => {
          router.reload();
        }, 2000);
      });

      console.log(order);
    } else {
      toast.error("حقول فارغة !");
    }
  };

  return (
    <div id="contact" className="w-full py-6">
      <div className="container">
        <hr />
        <div className="mt-4 mx-auto w-fit flex items-center flex-col">
          <h2 className="mx-auto w-fit">الشكاوى</h2>
          <Image alt="/" src="/icons/divider.png" width={200} height={10} />
        </div>
        <br />
        {/* form */}
        <form
          action=""
          onSubmit={(e) => submitOrder(e)}
          className="w-full"
          id="contact"
        >
          <label className="text-yellow-800">
            نعتذر في حالة حدوث مشكلة، يرجى تزويدنا بالبيانات التالية حتى نتمكن
            من خدمتك:
          </label>
          <hr className="mt-3" />
          <div className="form-group">
            <label htmlFor="">الإسم ثلاثي:</label>
            <input ref={nameRef} name="name" type="text" placeholder="..." />
          </div>
          <div className="form-group">
            <label htmlFor="">رقم الجوال:</label>
            <input
              ref={phoneRef}
              name="phone"
              type="text"
              placeholder="05********"
            />
          </div>
          <div className="form-group">
            <label htmlFor="">وصف الشكوى:</label>
            <textarea
              ref={complaintRef}
              name="complaint"
              rows="4"
              placeholder="..."
            />
          </div>

          <label className="text-[#d61f35]">
            *جميع الشكاوى تخضع لرقابة مباشرة من الإدارة العامة
          </label>
          <br />
          <div className="flex items-center justify-center">
            <button className="mx-auto btn btn-main flex items-center gap-x-2">
              ارسال
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
  );
};

export default Complaint;
