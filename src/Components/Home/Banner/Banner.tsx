"use client"
import Lottie from 'lottie-react';
import Link from "next/link";
// import Image from "next/image";
// import bannerbg from "../../../assests/images/banner.jpg";
// import { FaUpload } from "react-icons/fa";
// import TypeWriter from "@/Utils/TypeWriter/TypeWriter";
import animation from "../../../assests/lottie-animation/banner.json"
// import Lottie from "lottie-react";
import "./styles.css"
import PlayVideoModal from '../PlayvideoModal/PlayVideoModal';
const Banner = () => {
  return (
   <>
   <div className="banner h-[105vh] md:h-[100vh]">
        <div className='flex flex-col-reverse md:flex-row items-center justify-between max-w-7xl mx-auto pt-10 px-5'>
          {/* content */}
          <div className='space-y-4 flex-1 relative'>
          <div className="flex items-center gap-2">
          <div className="w-10 h-[2px] bg-primary"></div>
          <span className="uppercase font-semibold text-gray-300">
            file sharing plateform
          </span>
        </div>
            <h2 className='animate-text text-4xl md:text-5xl font-bold'>Share, Store, and Collaborate with Ease!</h2>
            <p className='text-gray-300 font-medium'>Discover effortless file sharing at DrivePulse. Upload, share, and collaborate seamlessly with our intuitive platform. Enjoy secure storage, unlimited file uploads, and simplified sharing—all in one place. Join us today and experience hassle-free file sharing like never before!</p>
            <Link href={"/dashboard/upload-file"}>
            <button className="button absolute left-[90px] -bottom-20">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Get Started
            </button></Link>
            <PlayVideoModal/>
          </div>
          {/* animation */}
          <div className='flex-1 '>
            <Lottie animationData={animation}/>
          </div>
        </div>
   </div>

   </>
  );
};

export default Banner;
