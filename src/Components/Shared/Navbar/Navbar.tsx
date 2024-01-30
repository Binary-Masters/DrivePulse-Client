"use client";

import logo from "../../../assests/icons/logo.png";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import useAuth from "@/Hooks/useAuth";

export default function Navbar() {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const pathname = usePathname();
  const [sroll, setScroll] = useState(false);
  const dividerPosition = 2;
  const routes = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/pricing", label: "Pricing" },
    { path: "/developers", label: "Developers" },
    { path: "/dashboard", label: "Dashboard" },
    { path: "/contact", label: "Contact" },
    { path: "/register", label: "Register" },
    { path: "/login", label: "Login" },
  ];
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`px-4 navbar md:px-14 fixed top-0  z-50 ${
        sroll ?
        "glass text-white shadow-md border-b py-2 transition-all duration-300" : "text-white"
      }`}>
      <div className="text-2xl navbar-start gap-2 md:text-3xl">
        <p onClick={() => setToggleSidebar(true)}>
          <FaBars className="text-xl cursor-pointer md:hidden min-w-1" />
        </p>
        <div className="flex items-center gap-1">
        <Image src={logo} className="w-[30px] h-[30px] md:w-[60px] md:h-[70px]" alt="DrivePulse Logo" />
        <div className="">
          <h2 style={{letterSpacing:"2px"}} className="font-bold text-blue-400 text-[20px] md:text-3xl">DRIVE</h2>
          <p style={{letterSpacing:"7px"}} className="text-[14px] md:text-[22px] font-medium md:-mt-2 -mt-3">PULSE</p>
        </div>
        </div>
      </div>

      {/* visible for larger devices */}
      <div className="hidden navbar-end gap-6 md:flex">
        {routes.map((route, i) => (
          <>
            <Link
              key={route.path + route.label}
              href={route.path}
              className={`group  ${pathname === route.path && "font-bold"} `}>
              {route.label}

              {/* Underlay */}
              <div
                className={`w-0 ${
                  pathname === route.path && "w-full h-[3px]"
                } rounded-full h-[2px] group-hover:w-full delay-100 ease-out transition-all bg-primary`}></div>
            </Link>
            {routes.length - dividerPosition === i && (
              <div className="-mx-2 divider divider-horizontal divider-primary"></div>
            )}
          </>
        ))}
      </div>

      {/* visible for medium and smaller devices */}
      <div className="md:hidden navbar-end">
        <div className="divider divider-horizontal divider-primary"></div>
        <Link href="/login">Login</Link>
      </div>

      {/* Sidebar */}
      <div
        className={`absolute ${
          toggleSidebar ? "block" : "hidden"
        } gap-6 flex p-4 glass z-[9999] h-screen flex-col top-0 left-0 min-w-[280px] backdrop-blur-2xl bg-opacity-10 bg-neutral w-[60%]`}>
        <div
          className="self-end cursor-pointer"
          onClick={() => setToggleSidebar(false)}>
          <p className="flex items-center gap-2">
            Back <FaArrowLeft className="block text-xl" />
          </p>
        </div>
        <ul className="w-full">
          {routes.map((route, i) => (
            <>
              <li>
                <Link
                  key={route.path + route.label}
                  href={route.path}
                  className={`${pathname === route.path && "font-bold"}`}>
                  {route.label}
                </Link>
                {routes.length - 1 !== i && (
                  <div className="my-2 divider"></div>
                )}
              </li>
            </>
          ))}
        </ul>
      </div>
    </div>
  );
}
