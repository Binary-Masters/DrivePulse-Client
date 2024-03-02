import { useEffect, useRef } from "react";
import { format } from "timeago.js";
import useAuth from "@/Hooks/useAuth";
import useGetSingleUser from "@/Hooks/useGetSingleUser";
import Image from "next/image";
import toast from "react-hot-toast";

const Message = ({ message }) => {
  const { user } = useAuth();
  const { senderId, text, createdAt } = message;
  const scroll = useRef<any>();
  const [userData] = useGetSingleUser();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div key={message?._id}>
      {senderId === userData?._id ? (
        <div ref={scroll} className="w-full">
          <div className="flex items-center gap-3 space-y-3">
            <figure>
              <Image
                src={user.photoURL}
                alt=""
                className="w-10 h-10 rounded-full border-2 border-primary"
                width={100}
                height={100}
              />
            </figure>
            <div className="bg-primary text-white p-2 px-4 rounded-b-full rounded-r-full">
              {text}
            </div>
          </div>
          <p className="text-slate-300 ml-[50px]">
            <small>{format(createdAt)}</small>
          </p>
        </div>
      ) : (
        <div ref={scroll} className="w-full">
          <div className="flex justify-end  items-center gap-3 space-y-3">
            <div className="bg-gray-400 text-white p-2 px-4 rounded-t-full rounded-l-full">
              {text}
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
            <small>{format(createdAt)}</small>
          </p>
        </div>
      )}
    </div>
  );
};

export default Message;
