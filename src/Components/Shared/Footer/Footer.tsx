// "use client"
import Image from 'next/image'
import '../../../app/globals.css'

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
      <footer className="  w-full bgColour h-full lg:h-[300px] ">
        {/* main div */}
        <div className='  '>
        <div className='flex flex-col   md:gird md:grid-cols-2 lg:flex-row  lg:gap-60 lg:justify-evenly w-full overflow-hidden px-20 '>
          {/* 1st div */}
      <div className='' >
        <p className='text-3xl '>DrivePulse</p>
      
      {/* <FaRegStar className='animate-spin'></FaRegStar> */}

      {/* form  i will update this form todo */}
      <form className='flex items-center justify-between my-5'>
        <MdMarkEmailRead className='h-5 w-5 mr-2' ></MdMarkEmailRead>
        <input className='bg-transparent cursor-pointer' type="email" placeholder='Enter your Email ' />
        <p className='cursor-pointer'><FaArrowRight></FaArrowRight></p>
      </form>
      {/* social icon */}
      <div className='flex  justify-between items-center my-6  '>
        <div className='w-10 h-11 flex justify-center items-center  rounded-full bg-white cursor-pointer '><FaFacebookF className='w-8 h-8 text-[#000]' ></FaFacebookF></div>
        <div className='w-10 h-11 flex justify-center items-center  rounded-full bg-white cursor-pointer '><FaTwitter className='w-8 h-8 text-[#000]'></FaTwitter></div>
        <div className='w-10 h-11 flex justify-center items-center  rounded-full bg-white cursor-pointer '><FaWhatsapp className='w-8 h-8 text-[#000]'></FaWhatsapp></div>
        <div className='w-10 h-11 flex justify-center items-center  rounded-full bg-white cursor-pointer '><FaDiscord className='w-8 h-8 text-[#000]'></FaDiscord></div>

      </div>
      {/* end */}
      </div>
    {/* 2nd */}
      <div className=''>
     <div> FEATURES <div className="underline -mt-5 "><span></span></div></div>
     <div className='my-8 flex flex-col gap-4 '>
        <p className='cursor-pointer text-balance hover:underline'>File Upload </p>
        <p className='cursor-pointer text-ellipsis hover:underline'>File Sharing </p>
        <p className='cursor-pointer hover:underline'>Access File</p>
        <p className='cursor-pointer hover:underline'>Notification</p>
        
      </div>
      
      </div>
      {/* 3rd */}
      <div>
      LEARN MORE <div className="underline -mt-5"><span></span></div>
      <div className='my-8 flex flex-col gap-4'>
        <p className='cursor-pointer hover:underline'>About</p>
        <p className='cursor-pointer hover:underline'>Blog</p>
        <p className='cursor-pointer hover:underline'>Contact</p>
        <p className='cursor-pointer hover:underline'>Dashboard</p>
        
      </div>
      </div>
    {/* 4th */}
      <div>
      SUPPORTS <div className="underline -mt-5"><span></span></div>

      <div className='my-8 flex flex-col gap-4'>
        <p className='cursor-pointer hover:underline'>Help Center</p>
        <p className='cursor-pointer hover:underline'>Privacy Policy </p>
        <p className='cursor-pointer hover:underline'>Contact Us</p>
        <p className='cursor-pointer hover:underline'>Terms of Use</p>
        
      </div>
      </div>
     
    
        </div>


        </div>
        <hr />
        {/* cope  todo */}
       <p className='text-center text-white mt-4 '> Binary Master ©2024 . All Rights Reserved.</p>
        
        
      </footer>
       
    </div>
  )
}

export default Footer
