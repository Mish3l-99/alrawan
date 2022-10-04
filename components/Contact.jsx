import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { db } from "../firebase";

const Contact = () => {
  const [loading, setLoading] = useState(false);

  const nameRef = useRef();

  const phoneRef = useRef();
  const cityRef = useRef();
  const desRef = useRef();

  const program = useSelector((state) => state.program.value);

  const router = useRouter();

  console.log(program);

  const submitOrder = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const phone = phoneRef.current.value;
    const city = cityRef.current.value;
    const destination = desRef.current.value;

    const createdAt = new Date().getTime();

    if (phone !== "" && city !== "" && destination !== "" && name !== "") {
      setLoading(true);
      let order = {
        name,
        phone,
        city,
        destination,
        type: "normal",
        createdAt,
      };
      if (program) {
        order = { ...order, program };
      }

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
          <h2 className="mx-auto w-fit">تواصل معنا</h2>
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
          <div className="form-group">
            <label htmlFor="">الاسم :</label>
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
            <label htmlFor="">مدينتك:</label>
            <select ref={cityRef} name="" id="">
              <option value="">اختر</option>
              <option>الرياض</option>
              <option>جدة</option>
              <option>الشرقية</option>
              <option>أخرى</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="">وجهتك:</label>
            <select ref={desRef} name="" id="">
              <option value="">اختر</option>
              <option value="جورجيا">جورجيا</option>
              <option value="البوسنة">البوسنة</option>
              <option value="تركيا">تركيا</option>
              <option value="أذربيجان">أذربيجان</option>
              <option value="رحلات أوروبا">رحلات أوروبا</option>
              <option value="رحلات أوروبا جماعية">رحلات أوروبا جماعية</option>
              <option value="المالديف">المالديف</option>
              <option value="ماليزيا">ماليزيا</option>
              <option value="تايلند">تايلند</option>
              <option value="موريشيوس">موريشيوس</option>
              <option value="ألبانيا">ألبانيا</option>
              <option value="كروز بحري">كروز بحري</option>
              <option value="حجز فنادق">حجز فنادق</option>
              <option value="حجز طيران">حجز طيران</option>
              <option value="تاشيرات علاجية">تاشيرات علاجية</option>
              <option value="تأشيرات">تأشيرات</option>
              <option value="تاشيرات دراسية">تاشيرات دراسية</option>
              <option value="رخصة دولية">رخصة دولية</option>
            </select>
          </div>
          <label className="text-[#d61f35]">
            *جميع الأسعار في الموقع تشمل قيمة الضريبة المضافة
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

export default Contact;
