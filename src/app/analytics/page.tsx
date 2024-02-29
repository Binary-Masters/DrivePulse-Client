"use client";
import LoadingAnimation from "@/Components/Animation/LoadingAnimation/LoadingAnimation";
import useChats from "@/Hooks/useChats";
import useGetAllUsers from "@/Hooks/useGetAllUsers";
import useGetFiles from "@/Hooks/useGetFiles";
import useGetSingleUser from "@/Hooks/useGetSingleUser";
import Link from "next/link";
import { FaRegTrashAlt, FaUserFriends } from "react-icons/fa";
import { LuFileSpreadsheet } from "react-icons/lu";

const Analytics = () => {
  const [user, loading] = useGetSingleUser();
  const [chats, refetch] = useChats();
  const filesDataResult = useGetFiles();
  const filesData = filesDataResult.filesData;
  const [users] = useGetAllUsers();
  const filterLocalStoreData = filesData?.filter(
    (item) => item.store === "Local"
  );
  const filterTrushStoreData = filesData?.filter(
    (item) => item.store === "Trush"
  );

  const friends = chats.map((chat) => chat.members[1]);
  // console.log(users?.length);
  if (loading) {
    return <LoadingAnimation />;
  }

  const adminData = [
    {
      id: 1,
      icon: <LuFileSpreadsheet />,
      number: filterLocalStoreData?.length,
      title: "Total Files",
      desc: "files",
      // details:'total-files'
    },
    {
      id: 2,
      icon: <FaRegTrashAlt />,
      number: filterTrushStoreData?.length,
      title: "Total Trash",
      desc: "totaltrushfiles",
    },
    {
      id: 3,
      icon: <FaUserFriends />,
      number: friends?.length,
      title: "Total Friends",
      desc: "chat",
    },
  ];

  let userData = adminData.filter((item) => item.id < 4); //filtering data for normal user

  return (
    <div>
      {user.type === "admin" ? (
        <div className="grid  lg:grid-cols-3 gap-3">
          {adminData.map((item) => (
            <Link
              href={`/dashboard/${item.desc}`}
              style={{ boxShadow: "1px 1px 20px #24207b" }}
              key={item?.id}
              className="rounded-md bg-[#090d2b] p-5 space-y-1 flex items-center justify-between"
            >
              <h3 className="text-2xl bg-primary text-white p-3 rounded-3xl">
                {item.icon}
              </h3>
              <div>
                <h1 className="text-3xl font-bold text-slate-300">
                  {item.number}
                </h1>
                <p className="font-medium text-gray-400">{item?.title}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid  lg:grid-cols-3 gap-3">
          {userData?.map((item) => (
            <Link
              href={`/dashboard/${item.desc}`}
              style={{ boxShadow: "1px 1px 20px #24207b" }}
              key={item?.id}
              className="rounded-md bg-[#090d2b] p-5 space-y-1 flex items-center justify-between"
            >
              <h3 className="text-2xl bg-primary text-white p-3 rounded-3xl">
                {item.icon}
              </h3>
              <div>
                <h1 className="text-3xl font-bold text-slate-300">
                  {item.number}
                </h1>
                <p className="font-medium text-gray-400">{item?.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Analytics;
