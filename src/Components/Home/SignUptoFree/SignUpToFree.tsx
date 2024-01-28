import React from 'react';
import { GiConfirmed } from "react-icons/gi";
import "./styles.css"
const SignUpToFree = () => {
    return (
        <div className='sign-up-box w-full h-fit md:h-[400px] bg-fixed py-20 px-3'>
           <div className='max-w-6xl mx-auto flex items-center flex-col-reverse md:flex-row gap-5'>
            <div className='flex-1 space-y-4'>
            <h4 className='flex items-center gap-1 text-white '><GiConfirmed className='text-green-500'/>Get 500 MB storage for free</h4>
            <h4 className='flex items-center gap-1 text-white'><GiConfirmed className='text-green-500'/>Secure file</h4>
            <h4 className='flex items-center gap-1 text-white'><GiConfirmed className='text-green-500'/>Unlimited services</h4>
            <h4 className='flex items-center gap-1 text-white'><GiConfirmed className='text-green-500'/>Share your file</h4>
            <h4 className='flex items-center gap-1 text-white'><GiConfirmed className='text-green-500'/>Get differents storage</h4>
            </div>
            <div className='flex-1 space-y-4 '>
            <div className="flex items-center gap-2">
          <div className="w-16 h-1 bg-primary"></div>
          <span className="uppercase font-semibold text-white">
          SIGN UP FOR FREE
          </span>
        </div>
        <h2 className='text-4xl md:text-6xl font-semibold text-white'>Get started for <span className='animate-text'>FREE!!</span></h2>
        <p className='text-gray-300 font-medium'>File storage made easy – including powerful features you won’t find anywhere else. Whether you’re sharing photos, videos, audio, or docs.</p>
            </div>
           </div>
        </div>
    );
};

export default SignUpToFree;