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
  const socket: React.MutableRefObject<Socket | null> = useRef(null);
  const [userData] = useGetSingleUser();
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState<{ userId: string }[]>([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const [chats] = useChats();

  useEffect(() => {
    socket.current = io("ws://localhost:3002");
  }, []);

  // connect socket.io
  useEffect(() => {
    socket.current?.emit("new-user-add", userData?._id);
    socket.current?.on("get-users", (users) => {
      // console.log(users);
      setOnlineUsers(users);
    });
  }, [userData]);

  // send message to socket
  useEffect(() => {
    // console.log("message send-->", sendMessage);
    if (sendMessage !== null && socket.current) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  // get message from socket server
  useEffect(() => {
    if (socket.current) {
      socket.current?.on("receive-message", (data) => {
        console.log("received message-->", data);
        setReceiveMessage(data);
      });
    }
  }, []);

  //online and offline user defined
  const checkOnlineStatus = (chat: any) => {
    const chatMember = chat.members?.find(
      (member: string) => member !== userData._id
    );
    const online = onlineUsers?.find(
      (user: { userId: string }) => user.userId === chatMember
    );
    // console.log(online);
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
        {/* add conversation */}
        <AddConversation />
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
