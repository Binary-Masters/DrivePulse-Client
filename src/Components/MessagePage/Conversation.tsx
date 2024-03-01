import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";

const Conversation = ({ data, currentUser, online, refetch, setCurrentChat }) => {
  const axiosPublic = useAxiosPublic();
  const [hovered, setHovered] = useState(false);

  const userId = data?.members.find((id) => id !== currentUser);
  const { data: conversationData } = useQuery({
    queryKey: ["conversationData", userId],
    queryFn: () =>
      axiosPublic
        .get(`/single-user/${userId}`)
        .then((response) => response.data),
  });

  const handleDelete = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure you want to delete this conversation?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.delete(`/chat/${data?._id}`);
          if (response?.data) {
            Swal.fire({
              title: "",
              text: `Conversation deleted successfully!`,
              icon: "success",
            });
            refetch();
          }
        } catch (error) {
          console.error("Failed to delete conversation:", error);
          Swal.fire({
            title: "Error",
            text: "Failed to delete conversation. Please try again later.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div
      className="flex items-center w-full justify-between cursor-pointer p-2 hover:bg-slate-700 rounded-md"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div
        onClick={() => setCurrentChat(data)}
        className=" flex flex-col md:flex-row items-center gap-2">
        <div className={`avatar ${online ? "online" : ""}`}>
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
          <h3 className="text-slate-200 font-medium text-[10px] md:text-[16px] hidden md:block">
            {conversationData?.name || "Unknown"}
          </h3>
          <p className="text-slate-400 -mt-2 text-center md:text-start hidden md:block">
            <small>{online ? "online" : "offline"}</small>
          </p>
        </div>
      </div>
      <button
        onClick={() => handleDelete(data)}
        className={`btn btn-circle btn-sm text-xl flex justify-center bg-primary hover:bg-blue-600 text-red-700 border-0  ${
          hovered ? "block" : "hidden"
        }`}>
        <MdClose />
      </button>
    </div>
  );
};

export default Conversation;
