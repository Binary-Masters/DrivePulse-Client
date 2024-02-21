"use client";
import React, { useEffect, useRef, useState } from "react";
import "./message.css";
import ChatBox from "./ChatBox";
import Conversation from "./Conversation";
import useGetSingleUser from "@/Hooks/useGetSingleUser";
import { userChats } from "@/api/ChatRequest";
import { io } from "socket.io-client";
const MessagePage = () => {
  const socket = useRef();
  const [chats, setChets] = useState([]);
  const [userData] = useGetSingleUser();
  // console.log(userData);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  // send message to socket
  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
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
        {chats.map((chat) => (
          <div key={chat._id} onClick={() => setCurrentChat(chat)}>
            <Conversation
              onlineUsers={onlineUsers}
              data={chat}
              currentUser={userData._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessagePage;
