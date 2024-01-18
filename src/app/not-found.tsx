

import NotFoundAnimation from '@/Components/Animation/NotFoundAnimation/NotFoundAnimation';
import Link from 'next/link';
import { TiArrowBack } from "react-icons/ti";
const NotFound = () => {
    return (
        <div>
            <NotFoundAnimation/>
            <h2 className='text-4xl font-bold text-red-500 text-center'>Opps ! </h2>
           <h2 className='text-xl text-red-600 font-semibold text-center my-2'>This page was not found!!</h2>
            <div className='flex justify-center'>
            <Link style={{letterSpacing:'1px'}} className=" btn text-xl hover:bg-[#11009E] transition-all duration-300 bg-[#1640D6] px-4 py-2 rounded-md text-white font-medium" href={"/"}><TiArrowBack/> Back to Home</Link>
            </div>
            </div>
    )
        
}
export default NotFound;

