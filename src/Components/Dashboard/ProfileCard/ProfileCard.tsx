'use client'
import Image from 'next/image'
import React from 'react'
// test
import img1 from "../../../assests/images/about1.jpg";
import useAuth from '@/Hooks/useAuth';
import { FaRegEdit } from "react-icons/fa";
const ProfileCard = () => {
  const { user, logout } = useAuth();
  console.log(user,'user info')
  return (
    <div>
      <div className="card w-72 h-96 bg-base-100 shadow-xl">
  <figure><div className="avatar">
  <div className="w-28 rounded-full ring hover:ring-offset-teal-700 ring-offset-base-100 ring-offset-2 my-8 ">
  <Image src={user?.photoURL || img1}
										height={50}
										width={100}
										alt="User avatars"/>
  </div>
</div></figure>
  <div className="">
    <h2 className=" text-center text-xl font-bold">{user?.displayName}</h2>
    <p className='text-center my-2'>User id : todo</p>
    <p className='text-center my-2'>{user?.email}</p>
    
    <p className='text-center my-2'>Number  : todo</p>

    <button className='absolute top-0 right-0 p-3'><FaRegEdit className='w-5 h-5'/></button>
    
    
  </div>
</div>




{/* test */}

    </div>
  )
}

export default ProfileCard

