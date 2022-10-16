import Image from "next/image";
import { Link } from "react-scroll";
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
          <Link
            activeClass="active"
            to="home"
            spy={true}
            smooth={true}
            offset={0}
            duration={300}
          >
            <div className="flex items-center gap-x-2">
              <Image alt="/" src="/logo/logo.png" width={43} height={43} />
              <Image alt="/" src="/logo/alrawan.png" width={140} height={30} />
            </div>
          </Link>
        </div>
        <div className="mr-12 flex justify-between items-center ">
          <ul className="text-lg hidden md:flex items-center navul">
            <li>
              {/* <Link href="/#home">Home</Link> */}
              <Link
                activeClass="active"
                to="home"
                spy={true}
                smooth={true}
                offset={0}
                duration={300}
                // onSetActive={this.handleSetActive}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                activeClass="active"
                to="about"
                spy={true}
                smooth={true}
                offset={0}
                duration={300}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                to="vision"
                spy={true}
                smooth={true}
                offset={-20}
                duration={300}
              >
                Our Vision
              </Link>
            </li>
            <li>
              <Link
                activeClass="active"
                to="values"
                spy={true}
                smooth={true}
                offset={0}
                duration={300}
              >
                Our Values
              </Link>
            </li>
            <li className="btn btn-main text-md">
              <Link
                activeClass="active"
                to="contact"
                spy={true}
                smooth={true}
                offset={0}
                duration={300}
              >
                Contact
              </Link>
            </li>
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
            <Link
              activeClass="active"
              to="home"
              spy={true}
              smooth={true}
              offset={0}
              duration={300}
              onClick={() => setMobNav(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="about"
              spy={true}
              smooth={true}
              offset={0}
              duration={300}
              onClick={() => setMobNav(false)}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="vision"
              spy={true}
              smooth={true}
              offset={-20}
              duration={300}
              onClick={() => setMobNav(false)}
            >
              Our Vision
            </Link>
          </li>
          <li>
            <Link
              activeClass="active"
              to="values"
              spy={true}
              smooth={true}
              offset={0}
              duration={300}
              onClick={() => setMobNav(false)}
            >
              Our Values
            </Link>
          </li>
          {/* <li>
            <Link href="/">Contact</Link>
          </li> */}
        </ul>
        <div className="flex flex-col">
          <Link
            activeClass="active"
            to="contact"
            spy={true}
            smooth={true}
            offset={0}
            duration={300}
            onClick={() => setMobNav(false)}
          >
            <button className="btn btn-main w-full">Contact</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
