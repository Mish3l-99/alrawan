import { addDoc, collection } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { db, storage } from "../firebase";

const EmploymentOrder = () => {
  const [loading, setLoading] = useState(false);

  const [cv, setCV] = useState(null);
  const [progress, setProgress] = useState();

  const nameRef = useRef();
  const ageRef = useRef();
  const genderRef = useRef();

  const phoneRef = useRef();
  const experRef = useRef();
  const cityRef = useRef();

  const nationalityRef = useRef();
  const jobRef = useRef();
  const qualiRef = useRef();

  const experienceRef = useRef();
  const cvRef = useRef();

  const router = useRouter();

  const uploadCV = (e) => {
    e.preventDefault();

    const cv = cvRef.current;
    const cvFile = cv.files[0];

    if (!cvFile) {
      toast.error("لا يوجد مرفقات!");
      return;
    }

    const path = `/files/cvs/${cvFile.name}`;
    const storageRef = ref(storage, path);
    const uploadTask = uploadBytesResumable(storageRef, cvFile);

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
          setCV(url);
          toast.success("تم ارفاق الملف بنجاح");
        });
      }
    );
  };

  const submitOrder = (e) => {
    e.preventDefault();
    const name = nameRef.current.value;
    const age = ageRef.current.value;
    const gender = genderRef.current.value;

    const phone = phoneRef.current.value;
    const exper = experRef.current.value;
    const city = cityRef.current.value;

    const nationality = nationalityRef.current.value;
    const job = jobRef.current.value;
    const quali = qualiRef.current.value;

    const experience = experienceRef.current.value;

    const createdAt = new Date().getTime();

    if (
      phone !== "" &&
      city !== "" &&
      age !== "" &&
      name !== "" &&
      gender !== "" &&
      nationality !== "" &&
      job !== "" &&
      quali !== "" &&
      experience !== "" &&
      exper !== ""
    ) {
      setLoading(true);
      let order = {
        phone,
        city,
        age,
        name,
        gender,
        nationality,
        job,
        quali,
        experience,
        exper,
        type: "employment",
        createdAt,
      };
      if (cv) {
        order = { ...order, cv };
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
          <h2 className="mx-auto w-fit">طلب توظيف</h2>
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
          <label className="font-semibold">يرجى تعبئة البيانات التالية:</label>
          <hr className="mt-3" />
          <div className="form-group">
            <label htmlFor="">الإسم ثلاثي :</label>
            <input ref={nameRef} name="name" type="text" placeholder="..." />
          </div>
          <div className="form-group">
            <label htmlFor="">العمر :</label>
            <input ref={ageRef} name="age" type="number" placeholder="**" />
          </div>
          <div className="form-group">
            <label htmlFor="">الجنس :</label>
            <select name="gender" ref={genderRef}>
              <option value="">اختر</option>
              <option>ذكر</option>
              <option>أنثى</option>
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
            <label htmlFor="">هل لديك خبرة في مجال السياحة والسفر ؟</label>
            <select name="previous_exper" ref={experRef}>
              <option value="">اختر</option>
              <option>نعم</option>
              <option>لا</option>
            </select>
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
            <label htmlFor="">الجنسية:</label>
            <select ref={nationalityRef} name="nationality">
              <option value="">اختر</option>
              <option value="السعودية">السعودية</option>
              <option value="السودان">السودان</option>
              <option value="الأردن">الأردن</option>
              <option value="سوريا">سوريا</option>
              <option value="فلسطين">فلسطين</option>
              <option value="فلسطين (وثيقة مصرية)">فلسطين (وثيقة مصرية)</option>
              <option value="لبنان">لبنان</option>
              <option value="اليمن">اليمن</option>
              <option value="الصومال">الصومال</option>
              <option value="اثيوبيا">اثيوبيا</option>
              <option value="ارتيريا">ارتيريا</option>
              <option value="المغرب">المغرب</option>
              <option value="تونس">تونس</option>
              <option value="الجزائر">الجزائر</option>
              <option value="ليبيا">ليبيا</option>
              <option value="أخرى">أخرى</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="">الوظيفة:</label>
            <select ref={jobRef} name="job">
              <option value="">اختر</option>
              <option value="معقب سفارات">معقب سفارات</option>
              <option value="مختص سياحة">مختص سياحة</option>
              <option value="مبيعات وخدمة عملاء">مبيعات وخدمة عملاء</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="">أعلى مؤهل أكاديمي :</label>
            <select ref={qualiRef} name="quali">
              <option value="">اختر</option>
              <option value="ثانوية فأقل">ثانوية فأقل</option>
              <option value="دبلوم">دبلوم</option>
              <option value="بكالوريس">بكالوريس</option>
              <option value="ماجستير">ماجستير</option>
              <option value="دكتوراه">دكتوراه</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="">عدد سنوات الخبرة:</label>
            <select ref={experienceRef} name="experience">
              <option value="">اختر</option>
              <option value="أقل من سنة">أقل من سنة</option>
              <option value="من سنة إلى سنتين">من سنة إلى سنتين</option>
              <option value="من 3 سنوات إلى 5 سنوات">
                من 3 سنوات إلى 5 سنوات
              </option>
              <option value="من 6 سنوات إلى 10 سنوات">
                من 6 سنوات إلى 10 سنوات
              </option>
              <option value="أكثر من 10 سنوات">أكثر من 10 سنوات</option>
            </select>
          </div>

          <div className="form-group bg-slate-400 p-3">
            <label htmlFor="">يرجى إرفاق السيرة الذاتية (اختياري) :</label>
            <div className=" flex items-center justify-between">
              <input ref={cvRef} name="cv" type="file" />
              <button
                className="text-sm px-3 py-1 rounded bg-blue-500 flex items-center gap-x-3"
                onClick={(e) => uploadCV(e)}
              >
                ارفاق
                {progress && <span>{progress} %</span>}
              </button>
            </div>
          </div>

          <br />
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="mx-auto btn btn-main flex items-center gap-x-2"
            >
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

export default EmploymentOrder;
