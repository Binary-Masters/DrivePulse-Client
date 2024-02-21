import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MdSend } from "react-icons/md";
import { getUser, userChats } from "../../api/ChatRequest";
import { addMessage, getMessages } from "../../api/MessageRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
const ChatBox = ({ chat, currentUser, setSendMessage, receiveMessage }) => {
  const [userData, setUserData] = useState(null);
  // console.log(userData);
  // console.log(receiveMessage);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
        // console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (chat !== null) {
      getUserData();
    }
    getUserData();
  }, [currentUser, chat]);
  // console.log(conversations);

  // feching data for header
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
      } catch (err) {
        console.log(err);
      }
    };
    if (chat !== null) {
      fetchMessages();
    }
  }, [chat]);
  // console.log(messages);

  const handleChange = (newMessage) => {
    setNewMessage(newMessage);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessage,
      chatId: chat?._id,
    };
    // send message to databse
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  // send message socket server
  useEffect(() => {
    const receiverId = chat?.members?.find((id) => id !== currentUser);
    setSendMessage({ ...messages, receiverId });
  }, [chat?.members, currentUser, messages, setSendMessage]);

  // receind message
  useEffect(()=>{
    if(receiveMessage !== null && receiveMessage?.chatId === chat._id){
      setMessages([...messages,receiveMessage])
    }
  },[receiveMessage, chat, messages])
  return (
    <div className="">
      {chat ? (
        <div>
       
          <div>
            {messages?.map((message) => (
              <div>
                {/* current user message */}
                {message.senderId === currentUser ? (
                  <div className="w-full">
                    <div className="flex items-center gap-3 space-y-3">
                      <figure>
                        <Image
                          src="https://lh3.googleusercontent.com/a/ACg8ocIapXQ9FG0-pl9NdBLyVNK-SpjeCbxAk2_MLWaPW4zaVkc=s96-c"
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
                  <div className="w-full">
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
                    <p className="text-slate-300 mr-[50px] text-end">
                      <small>{format(message?.createdAt)}</small>
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* sent box */}
          <div className="chat-sender absolute w-[98%] bottom-0">
            <div>+</div>
            <InputEmoji value={newMessage} onChange={handleChange} />
            <button
              onClick={handleSend}
              className="send-button btn py-3 hover:bg-blue-600  cursor-pointer bg-primary rounded text-[18px] text-white">
              Send <MdSend />
            </button>
            <input type="file" name="" id="" style={{ display: "none" }} />
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
