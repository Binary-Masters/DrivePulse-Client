'use client'
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation, Pagination } from 'swiper/modules';
 
import Image from 'next/image';


import images from '@/assests/images/blank-head-profile-pic-for-a-man.jpg';
import { FaWhatsappSquare } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
const Team = () => {
    // use to map array of objects 
    const members =[
        {"id": 1, "name": "Shahidul Islam (Leader) ", "description": "Description for Object 1."},
        {"id": 2, "name": "MD Morshed Alam", "description": "Description for Object 2."},
        {"id": 3, "name": "Zaib Khan", "description": "Description for Object 3."},
        {"id": 4, "name": "Sadid Hasan", "description": "Description for Object 4."},
        {"id": 5, "name": "Kamruj Jaman", "description": "Description for Object 5."},
        {"id": 6, "name": "Abu Bokor Siddik", "description": "Description for Object 6."}
      ]
      
      

  return (
    <section>
      
      
   <h1 className='text-3xl text-center my-12 font-bold '>Out Team Members</h1>
   {/* slider team member */}
      <Swiper 
      slidesPerView={1}
      loop={true}
      navigation={true}
      pagination={{
        clickable: true,
      }}
    //   apply but not work todo .
    //   autoplay={{
    //     delay: 2500,
    //     disableOnInteraction: false,
    //   }}
      centeredSlides={true}
      
      modules={[Navigation,Pagination]} className="mySwiper">
        {
            members?.map(member=><SwiperSlide key={member?.id}><div className="card w-96 mx-auto bg-base-100 shadow-xl my-6">
            <figure><Image  className='rounded-full' width={250} height={500} src={images} alt="photo" /></figure>
            <div className="card-body">
              <h2 className="card-title">{member?.name} </h2>
              <p >Hello, I am a passionate web developer with a proven track record of creating dynamic and user-friendly websites. With a focus on frontend development, I thrive on turning innovative ideas into interactive, responsive, and visually appealing digital experiences. </p>
              <div className="flex gap-10 mx-auto items-center my-3">
                <p ><FaFacebook  className="h-8 w-8 text-blue-500"/></p>
                <p ><FaWhatsappSquare className="h-8 w-8 text-green-600"/></p>
                <p ><FaDiscord className="h-8 w-8 text-blue-400"/></p>
                <p ><FaInstagram className="h-8 w-8 text-red-400"/></p>
              </div>
            </div>
          </div></SwiperSlide>)
        }
        
      </Swiper>
   </section>
    
  )
}

export default Team
