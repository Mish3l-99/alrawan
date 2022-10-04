import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDoc, doc } from "firebase/firestore";

import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import Social from "../../components/Social";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";
import Image from "next/image";
import Loading from "../../components/helpers/Loading";

const LongPageContent = () => {
  const router = useRouter();
  const { page } = router.query;
  return (
    <div className="w-full h-auto">
      <Navbar />
      {/* <Hero /> */}
      <PageDetails page={page} />
      <Social />
      <Footer />
    </div>
  );
};

export default LongPageContent;

export const PageDetails = (props) => {
  const { page } = props;

  const [data, setData] = useState();

  useEffect(() => {
    // getDoc
    getDoc(doc(db, "settings", "pages_content")).then((data) =>
      setData(data.data())
    );
  }, []);

  let title;

  switch (page) {
    case "return":
      title = "سياسة الاسترجاع";
      break;
    case "use":
      title = "شروط الإستخدام";
      break;
    case "certificate":
      title = "الشهادة الضريبية";
      break;
    case "payment":
      title = "طرق الدفع";
      break;
    case "faq":
      title = "الأسئلة الشائعة";
      break;
    case "about":
      title = "من نحن";
      break;
    default:
      title = "";
  }

  return (
    <div className="w-full h-auto py-6">
      <div className="container">
        <div className="mx-auto w-fit flex items-center flex-col">
          <h2 className="mx-auto w-fit">{title}</h2>
          <Image alt="/" src="/icons/divider.png" width={200} height={10} />
        </div>
        {!data ? (
          <Loading />
        ) : (
          <div className="mt-5">
            <div dangerouslySetInnerHTML={{ __html: data[page] }} />
          </div>
        )}
      </div>
    </div>
  );
};
