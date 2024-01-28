// "use client"
import Image from 'next/image'
import './styles.css'

import { FaRegStar } from "react-icons/fa6";
import { MdMarkEmailRead } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
const Footer = () => {
  return (
    <div>
      <footer className="  w-full h-full mx-auto  ">
        {/* main div */}
        <div className=' bg-[#0c163b] '>
        <div className='max-w-6xl mx-auto grid grid-cols-1 md:gird md:grid-cols-2 lg:grid-cols-4 md:justify-between md:mx-auto md:gap-x-56 md:items-center  lg:gap-60 lg:justify-evenly w-auto flex-shrink-0 overflow-hidden px-10 py-10'>
          {/* 1st div */}
      <div className='' >
        <p className='text-4xl text-white'>DrivePulse</p>
      {/* social icon */}
      <div className='flex gap-4  items-center my-6  '>
        <div className='btn btn-sm text-xl btn-circle'><FaFacebookF ></FaFacebookF></div>
        <div className='btn btn-sm text-xl btn-circle '><FaTwitter></FaTwitter></div>
        <div className='btn btn-sm text-xl btn-circle'><FaWhatsapp></FaWhatsapp></div>
        <div className='btn btn-sm text-xl btn-circle'><FaDiscord></FaDiscord></div>

      </div>
      {/* end */}
      </div>
    {/* 2nd */}
      <div className=''>
     <div className='text-white'> FEATURES <div className="underline -mt-5 "><span></span></div></div>
     <div className='my-8 flex flex-col gap-4 text-gray-400 '>
        <p className='cursor-pointer text-balance hover:underline'>File Upload </p>
        <p className='cursor-pointer text-ellipsis hover:underline'>File Sharing </p>
        <p className='cursor-pointer hover:underline'>Access File</p>
        <p className='cursor-pointer hover:underline'>Notification</p>
        
      </div>
      
      </div>
      {/* 3rd */}
      <div className='text-white'>
      LEARN MORE <div className="underline -mt-5"><span></span></div>
      <div className='my-8 flex flex-col gap-4 text-gray-400'>
        <p className='cursor-pointer hover:underline'>About</p>
        <p className='cursor-pointer hover:underline'>Blog</p>
        <p className='cursor-pointer hover:underline'>Contact</p>
        <p className='cursor-pointer hover:underline'>Dashboard</p>
        
      </div>
      </div>
    {/* 4th */}
      <div className='text-white'>
      SUPPORTS <div className="underline  -mt-5"><span ></span></div>

      <div className='my-8 flex flex-col gap-4 text-gray-400'>
        <p className='cursor-pointer hover:underline'>Help Center</p>
        <p className='cursor-pointer hover:underline'>Privacy Policy </p>
        <p className='cursor-pointer hover:underline'>Contact Us</p>
        <p className='cursor-pointer hover:underline'>Terms of Use</p>
        
      </div>
      </div>
     
    
        </div>


        </div>
        <div className="w-full h-[1px] bg-white"></div>
        {/* cope  todo */}
       <p className='text-center text-white bg-[#050d2c] py-5'> Binary Master ©2024 . All Rights Reserved.</p>
        
        
      </footer>
       
    </div>
  )
}

export default Footer
