/* eslint-disable @next/next/no-img-element */
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useChats from "@/Hooks/useChats";
import useGetAllUsers from "@/Hooks/useGetAllUsers";
import useGetSingleUser from "@/Hooks/useGetSingleUser";
import Image from "next/image";
import { IoPersonAdd } from "react-icons/io5";
import { MdAdd, MdClose } from "react-icons/md";
import Swal from "sweetalert2";

const AddConversation = () => {
  const [users] = useGetAllUsers();
  const [userData] = useGetSingleUser();
  const axiosPublic = useAxiosPublic();
  const [chats, refetch] = useChats();

  //get avilable user with existing all users
  const userId = chats.map((chat) =>
    chat.members.find((member) => member !== userData._id)
  );

  const finalUsers = users.filter((user) => user._id !== userData._id);
  const availableUsers = finalUsers.filter(
    (user) => !userId.includes(user?._id)
  );

  // add freind
  const handleSendFreind = (user) => {
    const modal = document.getElementById(
      "add-conversation"
    ) as HTMLDialogElement;
    if (modal) {
      modal.close();
    }

    const postInfo = {
      senderId: userData?._id,
      receiverId: user?._id,
    };
    Swal.fire({
      title: "Are you sure?",
      text: `Are you sure add your conversation ${user?.name} ?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosPublic.post("/chat", postInfo);
          if (response?.data) {
            Swal.fire({
              title: "Good job",
              text: `Successfully ${user?.name} added your conversation!`,
              icon: "success",
            });
            refetch();
          }
        } catch (err) {
          console.log("add conversation error->", err);
        }
      }
    });
  };

  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="flex w-full items-center justify-between px-3"
        onClick={() => {
          const modal = document.getElementById(
            "add-conversation"
          ) as HTMLDialogElement;
          if (modal) {
            modal.showModal();
          }
        }}>
        <h2 className="text-slate-300 font-medium text-xl">Add Conversation</h2>{" "}
        <span className="text-xl font-semibold text-slate-300">
          <MdAdd />
        </span>
      </button>
      <dialog id="add-conversation" className="modal">
        <div className="modal-box w-11/12 max-w-3xl relative bg-[#08072f]">
          <div className="modal-action absolute right-3 top-0">
            <form method="dialog">
              {/* if there is a button, it will close the modal */}
              <button className="btn btn-circle btn-sm text-xl">
                <MdClose />
              </button>
            </form>
          </div>

          {/* content */}
          <h3 className="text-center my-3 text-xl font-medium text-slate-300">
            Total Available Members: {availableUsers?.length}
          </h3>
          <hr />
          <div className="flex flex-col gap-6 mt-5">
            {availableUsers.map((user) => (
              <div
                key={user?._id}
                className="w-full flex justify-between items-center hover:bg-gray-600 p-3 rounded-md">
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="w-10 rounded-full border-2 border-primary">
                      <img src={user?.photoURL} alt="" />
                    </div>
                  </div>
                  <h3 className=" font-semibold text-slate-300">
                    {user?.name || "Unknown"}
                  </h3>
                </div>
                <button
                  onClick={() => handleSendFreind(user)}
                  className="btn bg-primary hover:bg-blue-600 border-0 text-[16px] text-white">
                  Add Freind <IoPersonAdd />
                </button>
              </div>
            ))}
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default AddConversation;
