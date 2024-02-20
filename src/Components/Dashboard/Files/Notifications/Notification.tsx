"use client";
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useGetFiles from "@/Hooks/useGetFiles";
import Loading from "@/app/loading";
import Link from "next/link";
import React, { useState } from "react";
import { IoNotificationsCircle } from "react-icons/io5";
import { MdNotifications } from "react-icons/md";

const Notification = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { filesData, isFilesLoading, refetchFiles } = useGetFiles();
  const filterNotify = filesData.filter((item) => item.owner.status === 0);

  const handelSeenNotifyFiles = () => {
    setOpen(false);
    axiosPublic
      .patch(`/notify?uid=${user?.uid}`)
      .then(() => {
        refetchFiles();
      })
      .catch();

    refetchFiles();
  };
  if (isFilesLoading) {
    return "";
  }
  return (
    <div className="dropdown">
      <div
        onClick={() => setOpen((pv) => !pv)}
        tabIndex={0}
        role="button"
        className={`relative inline-flex items-center p-2 text-sm font-medium text-center text-white rounded-lg ${
          open && `focus:ring-2 focus:outline-none focus:ring-blue-300`
        }`}
      >
        <MdNotifications className="text-2xl" />
        <span className="sr-only">Notifications</span>
        <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-1 -end-2">
          {filterNotify?.length}
        </div>
      </div>

      {open && (
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow rounded-box w-auto md:w-56 bg-[#010c4f] text-white"
        >
          {filterNotify?.map((item) => (
            <li key={item._id}>
              <Link
                href={"/dashboard/files"}
                className="flex flex-col items-start -space-y-2 hover:bg-blue-950"
              >
                <h2 className="flex text-sm md:text-lg justify-center items-center gap-2 font-medium">
                  {" "}
                  <IoNotificationsCircle /> {item.name}
                </h2>
                <p className="text-[10px] md:text-xs  ml-6">
                  {item.timeCreated.slice(11, 19)}
                </p>
              </Link>
            </li>
          ))}
          <button
            onClick={handelSeenNotifyFiles}
            className="btn btn-accent btn-xs"
          >
            Done
          </button>
        </ul>
      )}
    </div>
  );
};

export default Notification;
