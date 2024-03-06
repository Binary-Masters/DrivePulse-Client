"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";
// import required modules
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

import { FaFacebook,FaDiscord,FaLinkedin, } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

import shahidulIslamImg from '../../assests/Team-member-images/shahidul-islam.png'
import MorshedImg from '../../assests/Team-member-images/morshed.jpg'
import ZaibImg from '../../assests/Team-member-images/zaib.jpg'
import SadidImg from '../../assests/Team-member-images/sadid.jpg'
import kamrujjamanImg from '../../assests/Team-member-images/kamrujjaman.jpg'
import SiddikImg from '../../assests/Team-member-images/siddik.jpg'
import Link from "next/link";
const Team = () => {
  // use to map array of objects
  const members = [
    {
      id: 1,
      name: "Shahidul Islam (Leader) ",
      description: "Hi, I am Shahidul Islam. I am a MERN stack web developer. I have eight months learning experience in this field. I am using HTML,CSS,React,Tailwind for front-end development and Node.js,Express.js for back-end development. I also use mongodb for database.",
      images: shahidulIslamImg,
      facebookLink:"https://www.facebook.com/profile.php?id=100007891637711",
      linkDin:"https://www.linkedin.com/in/shahidul%2Dislam%2Djony/",
      discord :"https://discordapp.com/users/1033777363714056283" ,
      gmail:`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${'shahidulislam13sf@gmail.com'}`,

    },
    {
      id: 2,
      name: "MD Morsed Alam",
      description: "I Am Morsed . I Am Web Developer I Have Been Working Since 2019.MERN stack utilizes MongoDB for data storage, Express.js for server-side logic, React for building dynamic user interfaces, and Node.js for server-side runtime environment.",
      images:MorshedImg,
      facebookLink:"https://www.facebook.com/mdmorsed.alam.9809",
      linkDin:"https://www.linkedin.com/in/md-morsed-alam/",
      discord :"https://discordapp.com" ,
      gmail:`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${'mdmorsedalam12@gmail.com'}`,
    },
    { id: 3, name: "Zaib Khan", description: "A front-end web developer with a vision to transmute ideas into captivating digital experience. With a focus on efficient coding and problem-solving, I enjoy tackling diverse projects that contribute to the ever-evolving web landscape.",images:ZaibImg,facebookLink:"https://www.facebook.com/scarcrack",
    linkDin:"https://www.linkedin.com/in/kmjahanzaib/",
    discord :"https://discordapp.com/users/413222831296610305" ,
    gmail:`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${'kmjahanzaib@gmail.com'}`, },

    { id: 4, name: "Sadid Hasan", description: "MERN stack development involves using four key technologies: MongoDB, Express.js, React, and Node.js, to create full-stack web applications. MongoDB serves as the database, Express.js handles server-side logic, React builds dynamic user interfaces, and Node.js provides the runtime environment.",images:SadidImg,facebookLink:"https://www.facebook.com/sadidhasan.hasan.5",
    linkDin:"https://www.linkedin.com",
    discord :"https://discordapp.com" ,
    gmail:`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${'sadidhasan56@gmail.com'}`, },

    { id: 5, name: "Kamruj Jaman", description: "MERN stack development involves using four key technologies: MongoDB, Express.js, React, and Node.js, to create full-stack web applications. MongoDB serves as the database, Express.js handles server-side logic, React builds dynamic user interfaces, and Node.js provides the runtime environment.",images:kamrujjamanImg,facebookLink:"https://www.facebook.com/kj.rahil",
    linkDin:"https://www.linkedin.com/in/kj-rahil/",
    discord :"https://discordapp.com" ,
    gmail:`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${'rahiilarham@gmail.com'}`, },
    {
      id: 6,
      name: "Abu Bokor Siddik",
      description: "I'm Abu Bokor Siddik,MERN stack development involves using four key technologies: MongoDB, Express.js, React, and Node.js, to create full-stack web applications. MongoDB serves as the database.",
      images:SiddikImg,
      facebookLink:"https://www.facebook.com/profile.php?id=100024960182776",
      linkDin:"https://www.linkedin.com/in/md-abu-bokor-siddik-9303912a5/",
      discord :"https://discordapp.com/users/21801200154619" ,
      gmail:`https://mail.google.com/mail/u/0/?view=cm&fs=1&to=${'mdabubokorsiddikbissness@gmail.com'}`,
    },
  ];

  return (
    <section className="max-w-6xl mx-auto">
      <h1 className="text-3xl text-center my-12 font-bold text-slate-300">
        Our Team <span className="text-primary">Members</span>
      </h1>
      {/* slider team member */}
      <Swiper
        slidesPerView={1}
        loop={true}
        
        navigation={true}
        pagination={{
          clickable: true,
        }}
        
        centeredSlides={true}
        modules={[Navigation, Pagination]}
        className="mySwiper">
        {members?.map((member) => (
          <SwiperSlide key={member?.id}>
            <div className=" rounded-md  w-96 mx-auto bg-base-100 shadow-xl my-6">
              <figure className=" flex justify-center ">
                <Image
                  className="rounded-full z-10 mt-8"
                  width={250}
                  height={200}
                  src={member?.images}
                  alt="photo"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title z-10">{member?.name} </h2>
                <p className="z-10">
                  {member?.description}
                </p>
                <div className="flex gap-10 mx-auto items-center my-3 z-10">
                  <Link href={member?.facebookLink}><p>
                    <FaFacebook className="h-8 w-8 text-blue-500" />
                  </p></Link>
                  <Link href={member?.linkDin}><p>
                    <FaLinkedin className="h-8 w-8 text-blue-400" />
                  </p></Link>
                  <Link href={member?.gmail}>
                  <p>
                    <SiGmail className="h-8 w-8 text-red-400" />
                  </p>
                  </Link>
                  <Link href={member?.discord}>
                  <p>
                    <FaDiscord className="h-8 w-8 text-blue-400" />
                  </p>
                  </Link>
                  
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Team;
