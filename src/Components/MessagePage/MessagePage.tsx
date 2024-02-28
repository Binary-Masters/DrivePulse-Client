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
import { MdAdd } from "react-icons/md";

const MessagePage = () => {
  const socket = useRef<any>();
  const [userData] = useGetSingleUser();
  const axiosPublic = useAxiosPublic();
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState<{ userId: string }[]>([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  // get chats data with tanstackQuery
  const { data: chats } = useQuery({
    queryKey: ["chats"],
    queryFn: () =>
      axiosPublic
        .get(`/chat/${userData?._id}`)
        .then((response) => response.data),
  });
  // console.log(chats);
  // send message to socket
  useEffect(() => {
    if (sendMessage !== null) {
      (socket.current as any).emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current = io("https://drive-pulse-socket-server-klg9.vercel.app");
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

  //online and offline user define
  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== userData?._id);
    const online = onlineUsers.find((user) => user?.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="flex flex-col-reverse md:flex-row  gap-3 px-3">
      <div
        style={{ backdropFilter: "blur(100px)" }}
        className="md:w-[70%] h-[85vh] border-2 border-slate-500 rounded-md p-2 space-y-5 overflow-y-auto"
      >
        <ChatBox
          chat={currentChat}
          setSendMessage={setSendMessage}
          currentUser={userData._id}
          receiveMessage={receiveMessage}
        />
      </div>
      <div
        style={{ backdropFilter: "blur(100px)" }}
        className="md:w-[30%] border-2 border-slate-500 rounded-md p-5 overflow-x-auto md:overflow-y-auto"
      >
        <div className="flex items-center justify-between px-3">
          <h3 className="text-slate-300 font-medium text-xl">
            Add Conversation
          </h3>
          <span>
            <MdAdd className="text-xl font-semibold text-slate-300" />
          </span>
        </div>
        <hr className="my-3" />
        <div className="flex flex-row md:flex-col gap-2">
          {chats?.map((chat, i) => (
            <div key={i} onClick={() => setCurrentChat(chat)}>
              <Conversation
                data={chat}
                currentUser={userData._id}
                online={checkOnlineStatus(chat)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
