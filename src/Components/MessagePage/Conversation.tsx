"use client";
import useGetAllUsers from "@/Hooks/useGetAllUsers";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getUser } from "../../api/ChatRequest";
const Conversation = ({ data, currentUser, onlineUsers }) => {
  const [conversationData, setConversationData] = useState(null);
  useEffect(() => {
    const userId = data?.members.find((id) => id !== currentUser);
    console.log(userId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setConversationData(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, [currentUser, data.members]);
  console.log(conversationData);
  return (
    <div className="avatar flex items-center gap-2 cursor-pointer hover:bg-slate-700 p-2 rounded-md">
      <div className="w-10 rounded-full">
        <Image src={conversationData?.photoURL} alt="" width={100} height={100} />
      </div>
      <h3 className="text-slate-200 font-medium">{conversationData?.name}</h3>
    </div>
  );
};

export default Conversation;
