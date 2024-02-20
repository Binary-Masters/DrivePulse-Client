import Image from "next/image";
import React from "react";
import { MdSend } from "react-icons/md";

const ChatBox = () => {
  return (
    <div className="w-[55%] fixed h-[85vh] border p-2 space-y-5">
      {/* current user message */}
      <div>
        <div className="flex items-center gap-3">
          <figure>
            <Image
              src="https://lh3.googleusercontent.com/a/ACg8ocIapXQ9FG0-pl9NdBLyVNK-SpjeCbxAk2_MLWaPW4zaVkc=s96-c"
              alt=""
              className="w-10 h-10 rounded-full"
              width={100}
              height={100}
            />
          </figure>
          <div className="bg-primary text-white p-2 rounded">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
            nisi!
          </div>
        </div>
        <p className="text-slate-300 ml-[50px]">
          <small>1 houre ago</small>
        </p>
      </div>
      {/* another user message */}
      <div className="w-full">
        <div className="flex justify-end  items-center gap-3">
          <div className="bg-gray-400 text-white p-2 rounded">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum,
            nisi!
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
          <small>1 houre ago</small>
        </p>
      </div>
      {/* sent box */}
      <div className="join absolute bottom-2 left-[30%]">
        <input
          className="input input-bordered join-item"
          placeholder="Message..."
        />
        <button className="btn join-item rounded-r-md bg-primary hover:bg-blue-600 text-[18px] text-white">
          Send <MdSend />{" "}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
