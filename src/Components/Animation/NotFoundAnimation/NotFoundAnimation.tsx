"use client"
import Lottie from 'lottie-react';
import animationData from '../../../assests/lottie-animation/not-fount-page.json'

const NotFoundAnimation = () => {
    return (
        <div className='md:w-[400px] h-[300px] mx-auto'>
            <Lottie animationData={animationData}/>
        </div>
    );
};

export default NotFoundAnimation;