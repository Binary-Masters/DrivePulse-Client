
// 'use client'
import React from 'react';
import benefits from '../../../../public/benefits.json'
import { BsBook, BsBriefcaseFill, BsBrush, BsBuilding, BsCalendar, BsFilm, BsHeart, BsPerson } from 'react-icons/bs';
import Image from 'next/image';
import bg from '@/assests/mesh-309.png'

const Benefits = () => {
    const getIcon = (icon) => {
        switch (icon) {
            case 'BsBriefcaseFill':
                return <BsBriefcaseFill />;
            case 'BsBook':
                return <BsBook />;
            case 'BsHeart':
                return <BsHeart />;
            case 'BsBrush':
                return <BsBrush />;
            case 'BsFilm':
                return <BsFilm />;
            case 'BsBuilding':
                return <BsBuilding />;
            case 'BsCalendar':
                return <BsCalendar />;
            case 'BsPerson':
                return <BsPerson />;
            default:
                return null;
        }
    };
    return (
        <div className='bg-blue-200-900/40 bg-cover py-16 ' style={{
            backgroundImage: `url(${bg.src})`,
            width: '100%',
            height: '100%',
          }}>
             
            <h2 className='text-4xl font-bold py-10 text-center'>Who Benefits from <span className='text-[#5757f4]'>DrivePulse</span></h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-5'>
                {
                    benefits.map((item, index) => (
                        <div key={index} className="rounded-md bg-base-100 shadow hover:shadow-md shadow-[#5757f49f]">

                            <figure className="px-10 pt-10">
                                <div className="flex justify-center text-5xl">{getIcon(item.icon)}</div>
                            </figure>
                            <div className="card-body items-center text-center">
                                <h3 className='text-2xl font-bold'>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>

                        </div>

                    ))}
            </div>
        </div>
    );
};

export default Benefits;