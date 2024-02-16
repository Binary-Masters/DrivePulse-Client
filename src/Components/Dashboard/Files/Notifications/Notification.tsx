import React, { useState } from 'react';
import { IoNotificationsCircle } from 'react-icons/io5';
import { MdNotifications } from 'react-icons/md';

const Notification = () => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="dropdown">
            <div onClick={() => setOpen((pv) => !pv)}
                tabIndex={0} role="button" className={`relative inline-flex items-center p-2 text-sm font-medium text-center text-white rounded-lg ${open && `focus:ring-2 focus:outline-none focus:ring-blue-300`}`} >
                <MdNotifications className='text-2xl' />
                <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -end-2">2</div>
            </div>
            {
                open && <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow rounded-box w-auto md:w-56 bg-[#010c4f] text-white">
                    <li >
                        <div className='flex flex-col items-start -space-y-2 hover:bg-blue-950'>
                            <h2 className='flex text-sm md:text-lg justify-center items-center gap-2 font-medium'> <IoNotificationsCircle/> Item 1</h2>
                            <p className='text-[10px] md:text-xs  ml-6'>2 days ago</p>
                        </div>
                    </li>
                    <li >
                        <div className='flex flex-col items-start -space-y-2 hover:bg-blue-950'>
                            <h2 className='flex text-sm md:text-lg justify-center items-center gap-2 font-medium'> <IoNotificationsCircle/> Item 1</h2>
                            <p className='text-[10px] md:text-xs  ml-6'>2 hrs ago</p>
                        </div>
                    </li>
                </ul>
            }
        </div>

    );
};

export default Notification;