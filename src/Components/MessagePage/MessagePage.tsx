"use client";
import React, { useEffect, useRef, useState } from "react";
import "./message.css";
import ChatBox from "./ChatBox";
import Conversation from "./Conversation";
import useGetSingleUser from "@/Hooks/useGetSingleUser";
import { Socket, io } from "socket.io-client";
import AddConversation from "./AddConversation";
import useChats from "@/Hooks/useChats";

const MessagePage = () => {
  const socket = useRef<Socket | null>(null);
  const [userData] = useGetSingleUser();
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState<{ userId: string }[]>([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [chats, refetch] = useChats()

  console.log(receiveMessage);

  useEffect(() => {
    socket.current = io("ws://localhost:3002");
  }, []);

  useEffect(() => {
    socket.current?.emit("addUsers", userData?._id);
    socket.current?.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [userData]);

  useEffect(() => {
    if (sendMessage !== null && socket.current) {
      socket.current.emit("sendMessage", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("getMessage", (data) => {
        // Check if the received message is not the same as the previously received one
        if (JSON.stringify(data) !== JSON.stringify(receiveMessage)) {
          setReceiveMessage(data);
        }
      });
      return () => {
        // Clean up socket event listener when component unmounts
        socket.current.off("getMessage");
      };
    }
  }, [receiveMessage]); // Add receiveMessage as a dependency if necessary
  
  
  const checkOnlineStatus = (chat: any) => {
    const chatMember = chat.members?.find((member: string) => member !== userData._id);
    const online = onlineUsers?.find((user: { userId: string }) => user.userId === chatMember);
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
        className="md:w-[30%] border-2 border-slate-500 rounded-md p-5 ">
        
        {/* add conversation */}
        <AddConversation />
        <hr className="my-3" />
        <div className="">
        {
          chats?.length ===0 ? <p className="text-center text-slate-400 text-xl mt-5">No freind !</p> : <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">  {chats?.map((chat, i) => (
            <div key={i}>
              <Conversation
                data={chat}
                setCurrentChat={setCurrentChat}
                refetch={refetch}
                currentUser={userData._id}
                online={checkOnlineStatus(chat)}
              />
            </div>
          ))}</div>
        }
        </div>
      </div>
    </div>
  );
};

export default MessagePage;

