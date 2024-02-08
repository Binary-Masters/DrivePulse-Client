'use client'
import Image from 'next/image'
import React from 'react'
// test
import img1 from "../../../assests/images/about1.jpg";
import useAuth from '@/Hooks/useAuth';
import {  Settings } from "lucide-react";
import Link from 'next/link';
import Dropdown from './Dropdown';
import useGetSingleUser from '@/Hooks/useGetSingleUser';

const ProfileCard = () => {
  const { user, logout } = useAuth();
  // use hook call 
  const [userData, loading, refetch]=useGetSingleUser()

  console.log(userData?.name,'user info')
  return (
    <div>
      <div className="card w-80  h-96 bg-base-100 shadow-xl">
  <figure><div className="avatar">
  <div className="w-28 rounded-full ring hover:ring-offset-teal-700 ring-offset-base-100 ring-offset-2 my-8 ">
  <Image src={userData?.photoURL || img1}
										height={50}
										width={100}
										alt="User avatars"/>
  </div>
</div></figure>
  <div className="">
    <h2 className=" text-center text-xl font-bold">{userData?.name}</h2>
    {/* todo id */}
    <p className='text-center my-2'>User id : 0001</p>
    <p className='text-center my-2'>{userData?.email}</p>
    {/* todo number */}
    <p className='text-center my-2'>Number  : +088017*******</p>
     <Dropdown/>
  </div>
</div>

    </div>
  )
}

export default ProfileCard

