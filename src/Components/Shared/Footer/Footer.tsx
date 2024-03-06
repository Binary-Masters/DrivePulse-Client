// "use client"

import './styles.css'
import { FaDiscord } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import Link from 'next/link';
import useAuth from '@/Hooks/useAuth';
const Footer = () => {
 
  return (
    <div>
      <footer className="  w-full h-full mx-auto  ">
        {/* main div */}
        <div className=' bg-[#0c163b]  '>
        <div className='lg:max-w-6xl mx-auto grid grid-cols-1 md:gird md:grid-cols-2 lg:grid-cols-4 md:justify-between md:mx-auto md:gap-x-56 md:items-center  lg:gap-60 lg:justify-evenly w-auto flex-shrink-0 overflow-hidden px-10 py-10'>
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
      <div className=' w-28'>
     <div className='text-white'> FEATURES <div className="underline w-[86px] -mt-5 "><span></span></div></div>
     <div className='my-8 flex flex-col gap-4 text-gray-400 '>
        <p className=' text-balance '>File Upload </p>
        <p className=' text-ellipsis '>File Sharing </p>
        <p className=' '>Access File</p>
        <p className=' '>Notification</p>
        
      </div>
      
      </div>
      {/* 3rd */}
      <div className='text-white  w-28 '>
      LEARN MORE <div className="underline w-[100px] -mt-5"><span></span></div>
      <div className='my-8 flex flex-col gap-4 text-gray-400'>
        <Link href='/about'><p className='cursor-pointer hover:underline'>About</p></Link>
        <p className=''>Blog</p>
       <Link href="/contact"> <p className='cursor-pointer hover:underline'>Contact</p></Link>
       <p>Dashboard</p>
        
      </div>
      </div>
    {/* 4th */}
      <div className='text-white  w-28'>
      SUPPORTS <div className="underline w-[86px]  -mt-5"><span ></span></div>

      <div className='my-8 flex flex-col gap-4 text-gray-400'>
        <p className=''>Help Center</p>
        <p className=''>Privacy Policy </p>
        <Link href="/contact"><p className='cursor-pointer hover:underline'>Contact Us</p></Link>
        <p className=''>Terms of Use</p>
        
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
