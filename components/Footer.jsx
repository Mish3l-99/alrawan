import Link from "next/link";
import React from "react";

import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <div id="footer" className="w-full py-6 bg-gray-800">
      <div className="container">
        <div className="grid grid-cols-12">
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <ul>
              <li className="border-b text-[#d61f35] border-gray-600 text-lg mt-4 w-fit">
                سياسات و شروط
              </li>
              <li>
                <Link href="/pages/return">سياسة الاسترجاع</Link>
              </li>
              <li>
                <Link href="/pages/use">شروط الإستخدام</Link>
              </li>
              <li>
                <Link href="/pages/certificate">الشهادة الضريبية</Link>
              </li>
            </ul>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4">
            <ul>
              <li className="border-b text-[#d61f35] border-gray-600 text-lg mt-4 w-fit">
                روابط
              </li>
              <li>
                <Link href="/pages/faq">الأسئلة الشائعة</Link>
              </li>
              <li>
                <Link href="/contact">تواصل معنا</Link>
              </li>
              <li>
                <Link href="/pages/payment">طرق الدفع</Link>
              </li>
              {/* <li>
                <Link href="/">المجلة</Link>
              </li> */}
            </ul>
          </div>
          <div className="col-span-12 md:col-span-6 lg:col-span-4 pt-4">
            <div className="">
              <h1 className="logo">Logo</h1>
            </div>
            <div className="">
              <div className="mt-4 flex flex-row medias-f gap-x-3">
                <div>
                  <FiFacebook size={20} />
                </div>
                <div>
                  <FaInstagram size={20} />
                </div>
                <div>
                  <BsTwitter size={20} />
                </div>
              </div>
            </div>
            <div className="text-gray-400 text-md mt-4">
              <p>جميع الحقوق محفوظة © Visa للسياحة 2022</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
