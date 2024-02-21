
import Image from "next/image";
const Message = () => {
  return (
    <div className="w-full">
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
  );
};

export default Message;
