import Image from "next/image";
import React, { useEffect, useRef, useState, RefObject } from "react";
import { addMessage, getMessages } from "../../api/MessageRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import toast from "react-hot-toast";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { FiSend } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import useGetAllUsers from "@/Hooks/useGetAllUsers";

// Define the type for a message
interface Message {
  text: string;
}

const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState<any>(null);
  const scroll = useRef<any>();
  const axiosPublic = useAxiosPublic();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [users] = useGetAllUsers();

  // Function to handle change in message input
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  // Fetch user data of the chat
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const res = await axiosPublic.get(`/single-user/${userId}`);
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (chat !== null) getUserData();
  }, [currentUser, chat, axiosPublic]);

  // Fetch messages for the chat
  const { refetch } = useQuery({
    queryKey: ["messageData", chat?._id],
    queryFn: async () => {
      const response = await axiosPublic.get(`/message/${chat?._id}`);
      setMessages(response.data);
      return response.data;
    },
  });

  // Send message
  const handleSend = async () => {
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    if (newMessage) {
      const receiverId = chat.members.find((id) => id !== currentUser);
      setSendMessage({ ...message, receiverId });

      try {
        const { data } = await addMessage(message);
        setMessages([...messages, data]);
        refetch();
        setNewMessage("");
      } catch (err) {
        console.log(err);
      }
    } else {
      toast.error("Can't send empty message!");
    }
  };

  // if (receiveMessage === null) {
  //   refetch();
  // }

  // Receive new message
  useEffect(() => {
    if (receiveMessage === null) {
      refetch();
    }
    if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
      refetch();
      setMessages([...messages, receiveMessage]);
    }
  }, [receiveMessage, chat, messages, refetch]);

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  // console.log(messages.senderId);

  const photoData = users.filter((user) =>
    messages.some((message) => message.senderId === user?._id)
  );
  // console.log(availableUsers[0].photoURL);

  return (
    <div className="relative ">
      {chat ? (
        <div>
          <div>
            {messages?.map((message: any) => (
              <div key={message?._id}>
                {message.senderId === currentUser ? (
                  <div ref={scroll} className="w-full">
                    <div className="flex items-center gap-3 space-y-3">
                      <figure>
                        <Image
                          src={photoData[1]?.photoURL}
                          alt=""
                          className="w-10 h-10 rounded-full"
                          width={100}
                          height={100}
                        />
                      </figure>
                      <div className="bg-primary text-white p-2 rounded-b-md rounded-r-md">
                        {message?.text}
                      </div>
                    </div>
                    <p className="text-slate-300 ml-[50px]">
                      <small>{format(message?.createdAt)}</small>
                    </p>
                  </div>
                ) : (
                  <div ref={scroll} className="w-full">
                    <div className="flex justify-end  items-center gap-3 space-y-3">
                      <div className="bg-gray-400 text-white p-2 rounded-t-md rounded-l-md">
                        {message?.text}
                      </div>
                      <figure>
                        <Image
                          src={userData?.photoURL}
                          alt=""
                          className="w-10 h-10 rounded-full"
                          width={100}
                          height={100}
                        />
                      </figure>
                    </div>
                    <p className="text-slate-300 mr-[50px] text-end -mt-2">
                      <small>{format(message?.createdAt)}</small>
                    </p>
                  </div>
                )}
              </div>
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
  );
};

export default ChatBox;
