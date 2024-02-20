"use client"
import useGetAllUsers from '@/Hooks/useGetAllUsers';
import Image from 'next/image';
import React from 'react';

const Friends = () => {
    const [users, loading, refetch] = useGetAllUsers()
    console.log(users);
    return (
        <div className='w-[30%] ml-[70%] border p-5'>
            <div className='flex flex-col gap-2'>
           {
            users?.map(user =>  <div key={user?._id} className="avatar flex items-center gap-2 cursor-pointer hover:bg-slate-700 p-2 rounded-md">
            <div className="w-10 rounded-full">
              <Image src={user?.photoURL} alt='' width={100} height={100} />
            </div>
            <h3 className='text-slate-200 font-medium'>{user?.name}</h3>
          </div>)
           }
            </div>
        </div>
    );
};

export default Friends;