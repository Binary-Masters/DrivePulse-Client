"use client";
import LoadingAnimation from "@/Components/Animation/LoadingAnimation/LoadingAnimation";
import useGetAllUsers from "@/Hooks/useGetAllUsers";
import useGetFiles from "@/Hooks/useGetFiles";
import useGetSingleUser from "@/Hooks/useGetSingleUser";
import Link from "next/link";
import { FaRegTrashAlt, FaUserFriends } from "react-icons/fa";
import { LuFileSpreadsheet } from "react-icons/lu";

const Analytics = () => {
  const [user, loading, refetch] = useGetSingleUser();
  const filesDataResult = useGetFiles();
	const filesData = filesDataResult.filesData;
  const [users]  = useGetAllUsers()
  // console.log(users?.length);
  if (loading) {
    return <LoadingAnimation />;
  }

  const adminData = [
    {
      id: 1,
      icon: <LuFileSpreadsheet />,
      number: filesData?.length,
      desc: "Total files",
      // details:'total-files'
    },
    {
      id: 2,
      icon: <FaRegTrashAlt />,
      number: 14,
      desc: "Total Trash",
    },
    {
      id: 3,
      icon: <FaUserFriends />,
      number: users?.length,
      desc: "Total Friends",
    }
  ];

  let userData = adminData.filter((item) => item.id < 4); //filtering data for normal user

  return (
    <div>
      {user.type === "admin" ? (
        <div className="grid  lg:grid-cols-3 gap-3">
          {adminData.map((item) => (
            <Link
              href={`/analytics/${item.desc}`}
              style={{ boxShadow: "1px 1px 20px #24207b" }}
              key={item?.id}
              className="rounded-md bg-[#090d2b] p-5 space-y-1 flex items-center justify-between">
              <h3 className="text-2xl bg-primary text-white p-3 rounded-3xl">
                {item.icon}
              </h3>
              <div>
                <h1 className="text-3xl font-bold text-slate-300">
                  {item.number}
                </h1>
                <p className="font-medium text-gray-400">{item?.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid  lg:grid-cols-3 gap-3">
          {userData.map((item) => (
            <Link
              href={`/analytics/${item.desc}`}
              style={{ boxShadow: "1px 1px 20px #24207b" }}
              key={item?.id}
              className="rounded-md bg-[#090d2b] p-5 space-y-1 flex items-center justify-between">
              <h3 className="text-2xl bg-primary text-white p-3 rounded-3xl">
                {item.icon}
              </h3>
              <div>
                <h1 className="text-3xl font-bold text-slate-300">
                  {item.number}
                </h1>
                <p className="font-medium text-gray-400">{item?.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Analytics;
