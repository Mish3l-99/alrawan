import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import Blog from "./helpers/Blog";
import Content from "./helpers/Content";
import Programs from "./helpers/Programs";
import Requests from "./helpers/Requests";

const Dashboard = () => {
  const [option, setOption] = useState("programs");

  const setHandle = (e) => {
    setOption(e.target.id);
  };
  useEffect(() => {
    console.log(option);
  }, [option]);

  return (
    <div id="admin" className="w-full min-h-screen">
      <div className="flex justify-center py-2 bg-gray-300">
        <h4>لوحة التحكم</h4>
      </div>
      <div className="container">
        <div className="options flex gap-x-3">
          <button
            id="requests"
            className={option === "requests" ? "btn active" : "btn"}
            onClick={(e) => setHandle(e)}
          >
            الطلبات
          </button>
          <button
            id="programs"
            className={option === "programs" ? "btn active" : "btn"}
            onClick={(e) => setHandle(e)}
          >
            البرامج
          </button>
          {/* <button
            id="blog"
            className={option === "blog" ? "btn active" : "btn"}
            onClick={(e) => setHandle(e)}
          >
            المجلة
          </button> */}
          <button
            id="content"
            className={option === "content" ? "btn active" : "btn"}
            onClick={(e) => setHandle(e)}
          >
            المحتوى
          </button>
        </div>
        <hr />
        <div className="sec">
          {option === "requests" ? (
            <Requests />
          ) : option === "programs" ? (
            <Programs />
          ) : option === "blog" ? (
            <Blog />
          ) : option === "content" ? (
            <Content />
          ) : (
            <p>something is wrong!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
