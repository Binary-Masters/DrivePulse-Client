import React from 'react';
import "./message.css"
import ChatBox from './ChatBox';
import Friends from './Friends';
const MessagePage = () => {
    return (
        <div className='flex  gap-5 px-3'>
            <ChatBox/>
            <Friends/>
        </div>
    );
};

export default MessagePage;