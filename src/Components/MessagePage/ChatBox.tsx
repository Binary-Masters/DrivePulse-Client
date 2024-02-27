import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MdSend } from "react-icons/md";
import { getUser, userChats } from "../../api/ChatRequest";
import { addMessage, getMessages } from "../../api/MessageRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import toast from "react-hot-toast";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { FiSend } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
// type defined
interface Message {
  text: string;
}
const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState(null);
  const scroll = useRef<any>();
  const axiosPublic = useAxiosPublic();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  //set emoji in message state
  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  //!fetch current user [fetch data in header]
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const res = await axiosPublic.get(`/single-user/${userId}`);
        // console.log(res.data);
        setUserData(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (chat !== null) getUserData();
  }, [currentUser, chat, axiosPublic]);

  // fetch message
  const { refetch } = useQuery({
    queryKey: ["messageData", chat?._id],
    queryFn: async () => {
      const response = await axiosPublic.get(`/message/${chat?._id}`);
      setMessages(response.data);
      return response.data; // Return the data fetched from the server
    },
  });

    // Receive Message from parent component
    useEffect(() => {
      // console.log("Message Arrived: ", receiveMessage);
      if (receiveMessage !== null && receiveMessage.chatId === chat._id) {
        refetch()
        setMessages([...messages, receiveMessage]);
      }
    }, [receiveMessage, chat, messages, refetch]);

  // Send Message
  const handleSend = async (e) => {
    // refetch()
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat._id,
    };

    if (newMessage) {
      // send message to socket server
      const receiverId = chat.members.find((id) => id !== currentUser);
      setSendMessage({ ...message, receiverId });
      // send message to database
      try {
        const { data } = await addMessage(message);
        setMessages([...messages, data]);
        refetch();
        setNewMessage("");
      } catch {
        console.log("error");
      }
    } else {
      return toast.error("Can't send empty message!");
    }
  };

  // Always scroll to last Message
  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  // press enter button and send message
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log('Key pressed:', event.key);
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default behavior of Enter key
      handleSend(event); // Call handleSend function
    }
  };
  
  

  return (
    <div className="relative">
      {chat ? (
        <div>
          <div>
            {messages?.map((message: any) => (
              <div key={message?._id}>
                {/* current user message */}
                {message.senderId === currentUser ? (
                  <div ref={scroll} className="w-full">
                    <div className="flex items-center gap-3 space-y-3">
                      <figure>
                        <Image
                          src={userData?.photoURL}
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
                  // other user message
                  <div ref={scroll} className="w-full">
                    <div className="flex justify-end  items-center gap-3 space-y-3">
                      <div className="bg-gray-400 text-white p-2 rounded-t-md rounded-l-md">
                        {message?.text}
                      </div>
                      <figure>
                        <Image
                          src="https://lh3.googleusercontent.com/a/ACg8ocIapXQ9FG0-pl9NdBLyVNK-SpjeCbxAk2_MLWaPW4zaVkc=s96-c"
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
          {/* sent box */}
          <div className="chat-sender sticky w-full bottom-0">
            <button className="bg-primary text-white text-xl font-medium py-1 px-2 cursor-pointer rounded">
              +
            </button>
            <InputEmoji value={newMessage} onChange={handleChange} onKeyDown={handleKeyDown}  />
            <button
              onClick={handleSend}
              className=" my-2 px-5 py-2 flex items-center gap-1 hover:bg-blue-600  cursor-pointer bg-primary rounded text-[18px] text-white">
              Send <FiSend />
            </button>
            <input   type="file" name="" id="" style={{ display: "none" }} />
          </div>
        </div>
      ) : (
        <p className="text-3xl  text-gray-400 text-center mt-5">
          Tap to your freind and chat now !
        </p>
      )}
    </div>
  );
};

export default ChatBox;
