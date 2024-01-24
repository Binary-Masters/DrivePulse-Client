"use client"
import Image from "next/image";
import bannerbg from "../../../assests/images/banner.jpg";
import { FaUpload } from "react-icons/fa";
import TypeWriter from "@/Utils/TypeWriter/TypeWriter";
import animation from "../../../assests/lottie-animation/banner.json"
import Lottie from "lottie-react";
import Link from "next/link";
const Banner: React.FC = () => {
  return (
    <div className="hero  relative ">
     <section className=" ">
  <div className=" px-5 py-20 lg:flex lg:h-screen lg:items-center">
    <div className=" text-center">
      <h1
        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-5xl md:text-7xl font-extrabold text-transparent"
      >
        Most Populer Cloud <br />

        <span className="sm:block">Platform ! </span>
      </h1>

      <p className="mx-auto max-w-3xl text-gray-400 mt-4  sm:text-xl/relaxed">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
        numquam ea!
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          className="block w-full rounded border border-blue-600 bg-primary px-12 py-3 text-xl font-medium text-white hover:bg-blue-500 hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
          href="/dashboard/upload-file"
        >
          Get Started
        </Link>

        <Link
          className="block w-full rounded border border-blue-600 px-12 py-3 text-xl font-medium text-gray-600 hover:text-white hover:bg-primary focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
          href="/about"
        >
          Learn More
        </Link>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default Banner;
