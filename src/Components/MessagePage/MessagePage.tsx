"use client";
import React, { useEffect, useRef, useState } from "react";
import "./message.css";
import ChatBox from "./ChatBox";
import Conversation from "./Conversation";
import useGetSingleUser from "@/Hooks/useGetSingleUser";
import { userChats } from "@/api/ChatRequest";
import { io } from "socket.io-client";
const MessagePage = () => {
  const socket = useRef()
  const [chats, setChets] = useState([]);
  const [userData] = useGetSingleUser();
  const [currentChat, setCurrentChat] = useState(null)
  const [onlineUsers, setOnlineUsers] = useState([])

  useEffect(()=>{
    socket.current = io("http://localhost:3002");
    socket.current.emit("new-user-add", userData?._id)
    socket.current.on("get-users", (users)=>{
      setOnlineUsers(users)
    })
  },[userData])

//   console.log(currentChat);
  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(userData._id);
        setChets(data);
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getChats();
  }, [userData]);
  return (
    <div className="flex  gap-5 px-3">
      <div className="w-[55%] fixed h-[85vh] border p-2 space-y-5">
      <ChatBox   chat={currentChat}
          currentUser={userData._id}/>
      </div>
     <div className="w-[30%] ml-[70%] border p-5">
     {chats.map((chat,i) => (
        <div key={i} onClick={setCurrentChat}>
          <Conversation onlineUsers={onlineUsers} data={chat} currentUser={userData._id} />
        </div>
      ))}
     </div>
    </div>
  );
};

export default MessagePage;
