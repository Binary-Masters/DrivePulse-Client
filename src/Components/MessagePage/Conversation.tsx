import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const Conversation = ({ data, currentUser,online }) => {
  const axiosPublic = useAxiosPublic();

  // find conversation member with id then get data
  const userId = data?.members.find((id) => id !== currentUser);
  const { data: conversationData} = useQuery({
    queryKey: ["conversationData", userId],
    queryFn: () => axiosPublic.get(`/single-user/${userId}`).then((response) => response.data),
  });

  return (
    <div className=" flex flex-col md:flex-row items-center gap-2 cursor-pointer hover:bg-slate-700 p-2 rounded-md">
      <div className={`avatar ${online && "online"}`}>
      <div className="w-10 rounded-full border-2 border-primary">
        <Image
          src={conversationData?.photoURL}
          alt=""
          width={100}
          height={100}
        />
      </div>
      </div>
      <div>
      <h3 className="text-slate-200 font-medium text-[12px] md:text-[18px]">{conversationData?.name || "Unknown"}</h3>
      <p className="text-slate-400 -mt-2 text-center md:text-start"><small>{online ? "online" : "offline"}</small></p>
      </div>
    </div>
  );
};

export default Conversation;
