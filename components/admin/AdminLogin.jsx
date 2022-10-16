import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../state/admin";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import Head from "next/head";

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
      toast.error("Empty Fields!");
      return;
    }

    if (data.username === "admin" && data.password === "123456") {
      toast.success("Success");
      setTimeout(() => {
        dispatch(login());
      }, 2000);
    } else {
      toast.error("Wrong Data !");
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="w-full h-screen">
        <div className="container h-full">
          <div className="flex justify-center items-center flex-col h-full">
            <div className="box">
              <h5 className="mb-4">Login</h5>
              <form action="" className="flex flex-col w-full" id="form-admin">
                <input
                  value={data.username}
                  name="username"
                  onChange={(e) => changeData(e)}
                  type="text"
                  placeholder="Username"
                />
                <input
                  value={data.password}
                  name="password"
                  onChange={(e) => changeData(e)}
                  type="password"
                  placeholder="Password"
                />
                <button className="btn btn-main" onClick={(e) => loginAdmin(e)}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
