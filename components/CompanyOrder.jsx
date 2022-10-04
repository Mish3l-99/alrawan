import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { db } from "../firebase";

const CompanyOrder = () => {
  const [loading, setLoading] = useState(false);

  const nameRef = useRef();
  const company_nameRef = useRef();

  const phoneRef = useRef();
  const emailRef = useRef();

  const cityRef = useRef();
  const desRef = useRef();

  const router = useRouter();

  const submitOrder = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const company_name = company_nameRef.current.value;
    const phone = phoneRef.current.value;

    const email = emailRef.current.value;
    const city = cityRef.current.value;
    const description = desRef.current.value;

    const createdAt = new Date().getTime();

    if (
      phone !== "" &&
      city !== "" &&
      description !== "" &&
      name !== "" &&
      company_name !== "" &&
      email !== ""
    ) {
      setLoading(true);
      let order = {
        phone,
        city,
        description,
        name,
        company_name,
        email,
        type: "company",
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
          <h2 className="mx-auto w-fit">طلبات الشركات</h2>
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
            <label htmlFor="">اسمك الكريم :</label>
            <input ref={nameRef} name="name" type="text" placeholder="..." />
          </div>
          <div className="form-group">
            <label htmlFor="">اسم الشركة :</label>
            <input
              ref={company_nameRef}
              name="company_name"
              type="text"
              placeholder="..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="">مدينتك:</label>
            <select ref={cityRef} name="" id="">
              <option value="">اختر</option>
              <option value="الرياض">الرياض</option>
              <option value="الخرج">الخرج</option>
              <option value="المجمعة">المجمعة</option>
              <option value="الزلفي">الزلفي</option>
              <option value="المزاحمية">المزاحمية</option>
              <option value="حريملاء">حريملاء</option>
              <option value="الدوادمي">الدوادمي</option>
              <option value="نفي">نفي</option>
              <option value="الجمش">الجمش</option>
              <option value="البجادية">البجادية</option>
              <option value="عفيف">عفيف</option>
              <option value="القويعية">القويعية</option>
              <option value="وادي الدواسر">وادي الدواسر</option>
              <option value="حوطة بني تميم">حوطة بني تميم</option>
              <option value="شقراء">شقراء</option>
              <option value="سدير">سدير</option>
              <option value="الجبيلة">الجبيلة</option>
              <option value="رماح">رماح</option>
              <option value="الغاط">الغاط</option>
              <option value="الدمام">الدمام</option>
              <option value="الخبر">الخبر</option>
              <option value="الظهران">الظهران</option>
              <option value="القطيف">القطيف</option>
              <option value="سيهات">سيهات</option>
              <option value="بقيق">بقيق</option>
              <option value="رأس تنورة">رأس تنورة</option>
              <option value="الجبيل">الجبيل</option>
              <option value="الأحساء">الأحساء</option>
              <option value="الهفوف">الهفوف</option>
              <option value="حفر الباطن">حفر الباطن</option>
              <option value="الخفجي">الخفجي</option>
              <option value="النعيرية">النعيرية</option>
              <option value="مكة المكرمة">مكة المكرمة</option>
              <option value="جدة">جدة</option>
              <option value="الطائف">الطائف</option>
              <option value="الجموم">الجموم</option>
              <option value="القنفذة">القنفذة</option>
              <option value="خليص">خليص</option>
              <option value="رابغ">رابغ</option>
              <option value="المدينة المنورة">المدينة المنورة</option>
              <option value="الحناكية">الحناكية</option>
              <option value="مهد الذهب">مهد الذهب</option>
              <option value="ينبع">ينبع</option>
              <option value="بدر">بدر</option>
              <option value="ينبع النخل">ينبع النخل</option>
              <option value="حائل">حائل</option>
              <option value="بريدة">بريدة</option>
              <option value="عنيزة">عنيزة</option>
              <option value="البكيرية">البكيرية</option>
              <option value="الرس">الرس</option>
              <option value="مذنب">مذنب</option>
              <option value="الأسياح">الأسياح</option>
              <option value="النبهانية">النبهانية</option>
              <option value="عرعر">عرعر</option>
              <option value="العويقلية">العويقلية</option>
              <option value="سكاكا">سكاكا</option>
              <option value="دومة الجندل">دومة الجندل</option>
              <option value="أبو عجرم">أبو عجرم</option>
              <option value="القريات">القريات</option>
              <option value="طريف">طريف</option>
              <option value="طبرجل">طبرجل</option>
              <option value="تبوك">تبوك</option>
              <option value="بئر ابن هرماس">بئر ابن هرماس</option>
              <option value="أملج">أملج</option>
              <option value="الوجه">الوجه</option>
              <option value="ضباء">ضباء</option>
              <option value="الباحة">الباحة</option>
              <option value="جيزان">جيزان</option>
              <option value="صبيا">صبيا</option>
              <option value="بيش">بيش</option>
              <option value="بارق">بارق</option>
              <option value="المجاردة">المجاردة</option>
              <option value="رجال ألمع">رجال ألمع</option>
              <option value="محايل عسير">محايل عسير</option>
              <option value="أبها">أبها</option>
              <option value="خميس مشيط">خميس مشيط</option>
              <option value="سراة عبيدة">سراة عبيدة</option>
              <option value="سبت العلايا">سبت العلايا</option>
              <option value="تثليث">تثليث</option>
              <option value="البشائر">البشائر</option>
              <option value="بيشة">بيشة</option>
              <option value="أبوعريش">أبوعريش</option>
              <option value="أحد المسارحة">أحد المسارحة</option>
              <option value="صامطة">صامطة</option>
              <option value="الطوال">الطوال</option>
              <option value="العقيق">العقيق</option>
              <option value="المندق">المندق</option>
              <option value="المخواة">المخواة</option>
              <option value="بلجرشي">بلجرشي</option>
              <option value="نجران">نجران</option>
              <option value="ظهران الجنوب">ظهران الجنوب</option>
            </select>
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
            <label htmlFor="">البريد الإلكتروني :</label>
            <input ref={emailRef} name="email" type="email" placeholder="..." />
          </div>
          <div className="form-group">
            <label htmlFor="">وصف الطلب :</label>
            <textarea rows="3" name="des" ref={desRef} />
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

export default CompanyOrder;
