import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../state/admin";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({
    password: "",
    username: "",
  });

  const changeData = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const loginAdmin = (e) => {
    e.preventDefault();

    if (data.username === "" || data.password === "") {
      toast.error("حقول فارغة !");
      return;
    }

    if (data.password !== "" && data.username !== "") {
      getDoc(doc(db, "settings", "admin")).then((res) => {
        const admin = res.data();
        if (
          admin.username === data.username &&
          admin.password === data.password
        ) {
          toast.success("معلومات صحيحة");
          setTimeout(() => {
            dispatch(login());
          }, 2000);
        } else {
          toast.error("بيانات خاطئة !");
        }
      });
    }
  };

  return (
    <div className="w-full h-screen">
      <div className="container h-full">
        <div className="flex justify-center items-center flex-col h-full">
          <div className="box">
            <h5 className="mb-4">تسجيل الدخول</h5>
            <form action="" className="flex flex-col w-full" id="form-admin">
              <input
                value={data.username}
                name="username"
                onChange={(e) => changeData(e)}
                type="text"
                placeholder="اسم المستخدم"
              />
              <input
                value={data.password}
                name="password"
                onChange={(e) => changeData(e)}
                type="password"
                placeholder="كلمة السر"
              />
              <button className="btn btn-main" onClick={(e) => loginAdmin(e)}>
                الدخول
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
