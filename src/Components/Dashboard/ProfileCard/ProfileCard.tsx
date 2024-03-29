"use client";
import Image from "next/image";
import React from "react";
// test
import img1 from "../../../assests/images/about1.jpg";
import Dropdown from "./Dropdown";
import useGetSingleUser from "@/Hooks/useGetSingleUser";
import Aboutimg from "../../../assests/images/about.jpg"
const ProfileCard = () => {
  // use hook call
  const [userData, loading, refetch] = useGetSingleUser();

  // console.log(userData?.name,'user info')
  return (
    <div>
      <div>
     
      </div>
      <div className="card my-28 w-80  h-96 bg-base-100 shadow-xl">
        <figure>
          <div className="avatar">
            <div className="w-28 rounded-full ring hover:ring-offset-teal-700 ring-offset-base-100 ring-offset-2 my-8 ">
              <Image
                src={userData?.photoURL || img1}
                height={50}
                width={100}
                alt="User avatars"
              />
            </div>
          </div>
        </figure>
        <div className="">
          <h2 className=" text-center text-xl font-bold">{userData?.name}</h2>
          {/* todo id */}
          <p className="text-center my-2">User id : 0001</p>
          <p className="text-center my-2">{userData?.email}</p>
          {/* todo number */}
          <p className="text-center my-2">Number : {userData?.phoneNumber}</p>
          <Dropdown />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
