"use client";
import React, { useEffect, useRef, useState } from "react";
import "./message.css";
import Conversation from "./Conversation";
import useGetSingleUser from "@/Hooks/useGetSingleUser";
import { io } from "socket.io-client";
import AddConversation from "./AddConversation";
import useChats from "@/Hooks/useChats";
import { FiSend } from "react-icons/fi";
import InputEmoji from "react-input-emoji";
import Message from "./Message";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import { addMessage } from "@/api/MessageRequest";
import { useQuery } from "@tanstack/react-query";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { MdFileUpload } from "react-icons/md";
import useGetAllUsers from "@/Hooks/useGetAllUsers";
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
let socket;
const MessagePage = () => {
  const [userData] = useGetSingleUser();
  const [currentChat, setCurrentChat] = useState<CurrentChatType | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<{ userId: string }[]>([]);
  const [chats, chatsRefetch] = useChats();
  const axiosPublic = useAxiosPublic();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [anotherUser, setAnotherUser] = useState<any>(null);
  const [newMessage, setNewMessage] = useState<string>("");
  const [users] = useGetAllUsers();

  // connect socket server
  useEffect(() => {
    socket = io("https://drivepulse-server.onrender.com");
    socket?.emit("setup", userData);
    socket?.on("connect", () => {
      if (userData) {
        socket?.emit("addUsers", userData._id);
      }
    });
    socket?.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
    socket?.on("connect_error", (error: Error) => {
      console.error("Socket server connection error-->", error);
      // toast.error("Failed to connect to real-time server. Please try again later.");
    });

    return () => {
      // Clean up socket connection
      socket?.disconnect();
    };
  }, [userData]);

  // get message from socket
  useEffect(() => {
    socket?.on("getMessage", (data: MessageType) => {
      if (currentChat) {
        setMessages([...messages, data]);
      }
    });
  }, [messages, currentChat]);

  // set emoji in  message
  const handleChange = (newMessage: string) => {
    setNewMessage(newMessage);
  };

  // send message
  const handleSend = async () => {
    const message = {
      senderId: userData?._id,
      text: newMessage,
      chatId: currentChat?._id,
    };
    if (newMessage && currentChat) {
      // send message socket
      const receiverId = currentChat?.members.find(
        (id: string) => id !== userData?._id
      );
      socket?.emit("sendMessage", {
        senderId: userData?._id,
        receiverId,
        text: newMessage,
      });

      try {
        //send message database
        const { data } = await addMessage(message);
        setMessages((prevMessages) => [...prevMessages, data]); // Update messages state
        setNewMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
        toast.error("Failed to send message. Please try again later.");
      }
    } else {
      toast.error("Can't send empty message!");
    }
  };

  // get message in database
  const { refetch, isLoading: messageLoading } = useQuery({
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

  // Handle received message
  useEffect(() => {
    refetch();
  }, [currentChat, refetch]);

  // find another user
  useEffect(() => {
    const receiverId = currentChat?.members.find(
      (id: string) => id !== userData?._id
    );
    const anotherUser = users.find((user) => user?._id === receiverId);
    setAnotherUser(anotherUser);
  }, [currentChat, userData, users]);

  // Online status check
  const isOnline = (chat: CurrentChatType) => {
    const chatMember = chat.members.find((member) => member !== userData._id);
    return onlineUsers.some((user) => user.userId === chatMember);
  };

  return (
    <div className="flex flex-col-reverse md:flex-row  gap-3 px-3">
      <div
        style={{ backdropFilter: "blur(100px)" }}
        className="md:w-[70%] h-[85vh] border-2 border-slate-500 rounded-md p-2 space-y-5 overflow-y-auto">
        <div className="relative ">
          {/* click the freind then open chat details */}
          {currentChat ? (
            <>
              {/* freind name */}
              <div className="text-center text-slate-400 sticky top-0">
                Chat with {anotherUser?.name || "Unknown"}...
              </div>
              <div>
                {/* message fetch loading  */}
                {messageLoading ? (
                  <p className="text-center my-10">
                    <span className="loading loading-spinner text-info"></span>
                  </p>
                ) : (
                  <div>
                    {messages?.length === 0 ? (
                      <p className="text-center text-primary mt-40">
                        No messages!
                      </p>
                    ) : (
                      <>
                        {messages?.map((message) => (
                          <Message
                            key={message._id}
                            message={message}
                            anotherUser={anotherUser}
                          />
                        ))}
                      </>
                    )}
                  </div>
                )}
                <div
                  className={`chat-sender ${
                    messages?.length <= 6 ? "fixed w-[95%]" : "sticky"
                  } w-full bottom-1 `}>
                  <div className="dropdown dropdown-top ">
                    <div
                      tabIndex={0}
                      role="button"
                      className="bg-primary text-white text-xl font-medium p-2 cursor-pointer rounded">
                      <IoMdAdd />
                    </div>
                    <ul
                      style={{ backdropFilter: "blur(200px)" }}
                      tabIndex={0}
                      className="dropdown-content z-10 menu p-4 shadow-lg  rounded-box w-52 mb-3 ">
                      <Link
                        href={"/dashboard/upload-file"}
                        className="text-[16px] btn hover:bg-primary bg-transparent border border-primary text-white">
                        Upload <MdFileUpload />
                      </Link>
                    </ul>
                  </div>
                  <InputEmoji
                    value={newMessage}
                    onChange={handleChange}
                    onEnter={handleSend}
                  />
                  <button
                    onClick={handleSend}
                    className="my-2 px-5 py-2 flex items-center gap-1 hover:bg-blue-600 cursor-pointer bg-primary rounded text-[25px] text-white">
                    <FiSend />
                  </button>
                  <input
                    type="file"
                    name=""
                    id=""
                    style={{ display: "none" }}
                  />
                </div>
              </div>
            </>
          ) : (
            <p className="text-3xl text-gray-400 text-center mt-5">
              Tap to your friend and chat now!
            </p>
          )}
        </div>
      </div>
      <div
        style={{ backdropFilter: "blur(100px)" }}
        className="md:w-[30%] border-2 border-slate-500 rounded-md p-5 ">
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
                    online={isOnline(chat)}
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
