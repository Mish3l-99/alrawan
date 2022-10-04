import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FiX, FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [MobNav, setMobNav] = useState(false);
  const handleNav = () => setMobNav(!MobNav);
  useEffect(() => {
    console.log(MobNav);
  }, [MobNav]);
  return (
    <div id="navbar" className="w-full shadow-md bg-white">
      <div className="nav-container">
        <div className="">
          <Link href="/">
            <h1 className="logo">Logo</h1>
          </Link>
        </div>
        <div className="flex justify-between items-center ">
          <ul className="hidden md:flex">
            <li>
              <Link href="/">الرئيسية</Link>
            </li>
            <li>
              <Link href="/contact">طلب تواصل</Link>
            </li>
            <li>
              <Link href="/pages/about">من نحن</Link>
            </li>
            <li>
              <Link href="/complaint">شكوى</Link>
            </li>
            <li>
              <Link href="/employment_order">توظيف</Link>
            </li>
            <li>
              <Link href="/company_order">طلبات الشركات</Link>
            </li>
            {/* <li>
              <Link href="/">المجلة</Link>
            </li> */}
          </ul>
        </div>
        {/* <div className="hidden md:flex items-center px-2">
          <button className="mr-3">Use Defi</button>
        </div> */}

        {/* Hamburger&cross */}
        <div
          className="md:hidden text-black flex items-center"
          onClick={handleNav}
        >
          {MobNav ? <FiX className="w-5" /> : <FiMenu className="w-5" />}
        </div>
      </div>

      {/* MobNav */}
      <div
        className={
          MobNav
            ? "mobnav duration-1000"
            : "mobnav opacity-0 pointer-events-none"
        }
      >
        <ul className="">
          <li>
            <Link href="/">الرئيسية</Link>
          </li>
          <li>
            <Link href="/contact">طلب تواصل</Link>
          </li>
          <li>
            <Link href="/pages/about">من نحن</Link>
          </li>
          <li>
            <Link href="/complaint">شكوى</Link>
          </li>
          <li>
            <Link href="/employment_order">توظيف</Link>
          </li>
          <li>
            <Link href="/company_order">طلبات الشركات</Link>
          </li>
          {/* <li>
            <Link href="/">المجلة</Link>
          </li> */}
        </ul>
        <div className="flex flex-col">
          <button className="">Use DeFi</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
