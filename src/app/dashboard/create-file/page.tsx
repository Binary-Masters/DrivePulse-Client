"use client"
import TextEditor from '@/Components/Dashboard/Files/CreateFile/TextEditor';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FaSave } from 'react-icons/fa';
import { MdOutlineArrowBack } from 'react-icons/md';
const EditTextFile = () => {
    const navigation = useRouter()

    return (
        <section className='gradient2-bg pt-20 min-h-screen'>
            <div className='flex justify-between items-center text-white bottom-shadow py-2 px-4'>
                <h2>index.html</h2>
                <div className='flex gap-4 text-white'>
                    <button onClick={() => navigation.back()}
                    className='btn bg-slate-700 text-white hover:text-black border-none'><MdOutlineArrowBack className='text-xl'/> Go Back</button>
                    <button className='btn bg-primary text-white hover:text-black border-none'><FaSave/> Submit</button>
                </div>
            </div>
            <div className='bg-slate-200 min-h-[calc(100vh-145px)]'>
              <TextEditor/>
            </div>
        </section>
    );
};

export default EditTextFile;