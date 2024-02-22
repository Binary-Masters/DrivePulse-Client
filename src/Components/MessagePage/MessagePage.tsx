"use client";
import React, { useEffect, useRef, useState } from "react";
import "./message.css";
import ChatBox from "./ChatBox";
import Conversation from "./Conversation";
import useGetSingleUser from "@/Hooks/useGetSingleUser";
import { userChats } from "@/api/ChatRequest";
import { io } from "socket.io-client";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import Image from "next/image";
const MessagePage = () => {
  const socket = useRef<any>();
  const [chats, setChets] = useState([]);
  console.log(chats);
  const [userData] = useGetSingleUser();
  const [filterChats, setFilterChats]= useState(null)
  // console.log(userData);
  const axiosPublic = useAxiosPublic()
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  // send message to socket
  useEffect(() => {
    if (sendMessage !== null) {
      (socket.current as any).emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("http://localhost:3002");
    socket.current.emit("new-user-add", userData?._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [userData]);

  //received message from socket
  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);

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
  // console.log(userData);

  // conversation data
  useEffect(()=>{
    chats.map(chat => setFilterChats(chat))
  },[chats])
  //  console.log(filterChats);
  const userId = filterChats?.members.find((id) => id !== userData?._id);
  console.log("friend id --->", userId)


  const { data: conversationData} = useQuery({
    queryKey: ["conversationData", userId],
    queryFn: () => axiosPublic.get(`/single-user/${userId}`).then((response) => response.data),
  });
  console.log(conversationData);
  return (
    <div className="flex  gap-5 px-3">
      <div className="w-[55%] fixed h-[85vh] border p-2 space-y-5">
        <ChatBox
          chat={currentChat}
          setSendMessage={setSendMessage}
          currentUser={userData._id}
          receiveMessage={receiveMessage}
        />
      </div>
      <div className="w-[30%] ml-[70%] border p-5">
         <div onClick={()=>setCurrentChat(filterChats)} className="avatar flex items-center gap-2 cursor-pointer hover:bg-slate-700 p-2 rounded-md">
      <div className="w-10 rounded-full">
        <Image
          src={conversationData?.photoURL}
          alt=""
          width={100}
          height={100}
        />
      </div>
      <h3 className="text-slate-200 font-medium">{conversationData?.name}</h3>
    </div>
      </div>
    </div>
  );
};

export default MessagePage;
