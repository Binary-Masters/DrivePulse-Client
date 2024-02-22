import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const Conversation = ({ data, currentUser, onlineUsers }) => {
  const axiosPublic = useAxiosPublic();
  console.log("user online-->", onlineUsers);
  console.log("conversation data--->", data);
  console.log("current user id ---> ", currentUser);

  
  const userId = data?.members.find((id) => id !== currentUser);
  console.log("friend id --->", userId)

  const { data: conversationData} = useQuery({
    queryKey: ["conversationData", userId],
    queryFn: () => axiosPublic.get(`/single-user/${userId}`).then((response) => response.data),
  });

  console.log(conversationData);

  return (
    <div className="avatar flex items-center gap-2 cursor-pointer hover:bg-slate-700 p-2 rounded-md">
      <div className="w-10 rounded-full">
        <Image
          src={conversationData?.photoURL}
          alt=""
          width={100}
          height={100}
        />
      </div>
      <h3 className="text-slate-200 font-medium">{conversationData?.name || "Unkown"}</h3>
    </div>
  );
};

export default Conversation;
