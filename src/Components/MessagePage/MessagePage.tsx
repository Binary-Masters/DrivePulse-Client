"use client";
import React, { useEffect, useRef, useState } from "react";
import "./message.css";
import Conversation from "./Conversation";
import useGetSingleUser from "@/Hooks/useGetSingleUser";
import { Socket, io } from "socket.io-client";
import AddConversation from "./AddConversation";
import useChats from "@/Hooks/useChats";
import { FiSend } from "react-icons/fi";
import InputEmoji from "react-input-emoji";
import Message from "./Message";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { addMessage } from "@/api/MessageRequest";
import { useQuery } from "@tanstack/react-query";

// type defined
interface MessageType {
  _id: string;
  senderId: string;
  text: string;
  createdAt: number;
}

interface CurrentChatType {
  _id: string;
  members: string[];
}
const MessagePage = () => {
  const socket = useRef<Socket | null>(null);
  const [userData] = useGetSingleUser();
  const [currentChat, setCurrentChat] = useState<CurrentChatType | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<{ userId: string }[]>([]);
  const [receiveMessage, setReceiveMessage] = useState<MessageType | null>(
    null
  );
  const [chats, chatsRefetch] = useChats();
  const axiosPublic = useAxiosPublic();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");


  // connect socket server
  useEffect(() => {
    socket.current = io("ws://localhost:3002");
    socket.current.on("getMessage", (data: MessageType) => {
      setReceiveMessage({
        senderId: data.senderId,
        text: data.text,
        createdAt: Date.now(),
        _id: data._id,
      });
    });
    socket.current.on("connect_error", (error: Error) => {
      console.error("Socket server connection error-->", error);
      toast.error("Failed to connect to real-time server. Please try again later.");
    });
  }, []);

  // add user and get user in socket server
  useEffect(() => {
    socket.current?.emit("addUsers", userData?._id);
    socket.current?.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [userData]);


  // set emoji in  message
  const handleChange = (newMessage: string) => {
    setNewMessage(newMessage);
  };

   // get message in database
  const { refetch } = useQuery({
    queryKey: ["messageData", currentChat?._id],
    queryFn: async () => {
      if (currentChat) {
        const response = await axiosPublic.get(`/message/${currentChat?._id}`);
        setMessages(response.data);
        return response.data;
      }
      return [];
    },
  });

  // received message in  conditionaly
  useEffect(() => {
    if (receiveMessage === null) {
      refetch();
    }
    receiveMessage &&
      currentChat?.members.includes(receiveMessage.senderId) &&
      setMessages((prev) => [...prev, receiveMessage]);
  }, [currentChat, receiveMessage, refetch]);



  const handleSend = async () => {
    const message = {
      senderId: userData?._id,
      text: newMessage,
      chatId: currentChat?._id,
    };
    if (newMessage && currentChat) {
      const receiverId = currentChat.members.find((id: string) => id !== userData?._id);
      socket.current?.emit("sendMessage", {
        senderId: userData?._id,
        receiverId,
        text: newMessage,
      });

      try {
        const { data } = await addMessage(message);
        setMessages([...messages, data]);
        setNewMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
        toast.error("Failed to send message. Please try again later.");
      }
    } else {
      toast.error("Can't send empty message!");
    }
  };


 
  const checkOnlineStatus = (chat: any) => {
    const chatMember = chat.members?.find((member: string) => member !== userData?._id);
    const online = onlineUsers?.find((user: { userId: string }) => user.userId === chatMember);
    return online ? true : false;
  };

  return (
    <div className="flex flex-col-reverse md:flex-row  gap-3 px-3">
      <div
        style={{ backdropFilter: "blur(100px)" }}
        className="md:w-[70%] h-[85vh] border-2 border-slate-500 rounded-md p-2 space-y-5 overflow-y-auto"
      >
        <div className="relative ">
          {currentChat ? (
            <div>
              <div>
                {messages?.map((message) => (
                  <Message key={message._id} message={message} />
                ))}
              </div>
              <div className="chat-sender sticky w-full bottom-0 ">
                <button className="bg-primary text-white text-xl font-medium py-1 px-2 cursor-pointer rounded">
                  +
                </button>
                <InputEmoji
                  value={newMessage}
                  onChange={handleChange}
                  onEnter={handleSend}
                />
                <button
                  onClick={handleSend}
                  className="my-2 px-5 py-2 flex items-center gap-1 hover:bg-blue-600 cursor-pointer bg-primary rounded text-[18px] text-white"
                >
                  Send <FiSend />
                </button>
                <input type="file" name="" id="" style={{ display: "none" }} />
              </div>
            </div>
          ) : (
            <p className="text-3xl text-gray-400 text-center mt-5">
              Tap to your friend and chat now!
            </p>
          )}
        </div>
      </div>
      <div
        style={{ backdropFilter: "blur(100px)" }}
        className="md:w-[30%] border-2 border-slate-500 rounded-md p-5 "
      >
        <AddConversation />
        <hr className="my-3" />
        <div className="">
          {chats?.length === 0 ? (
            <p className="text-center text-slate-400 text-xl mt-5">
              No friend !
            </p>
          ) : (
            <div className="flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto">
              {chats?.map((chat, i) => (
                <div key={i}>
                  <Conversation
                    data={chat}
                    refetch={chatsRefetch}
                    setCurrentChat={setCurrentChat}
                    currentUser={userData?._id}
                    online={checkOnlineStatus(chat)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
