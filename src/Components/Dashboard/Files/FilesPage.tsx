"use client";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { MdDelete } from "react-icons/md";
import FolderButton from "./Folder/FolderButton";
import useStorage from "@/Hooks/useStorage";
import icons from "./icons";
import { useState } from "react";
import NavigationFolder from "./Folder/NavigationFolder";
import useGetFilesByEmail from "@/Hooks/useGetFilesByEmail";
import UploadButton from "./UploadButton&Modal/UploadButton";
import MoreDropDown from "./MoreDropDown";
import Swal from "sweetalert2";
import Loading from "@/app/loading";

const FilesPage: React.FC = () => {
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const axiosPublic = useAxiosPublic();
  const { path, setPath, deleteFile } = useStorage();
  const [filesData, loading, refetch] = useGetFilesByEmail();

  // Fetching file data for appropriate user

  const nodeClickHandler = (type: string, fullPath: string) => {
    if (type === "folder") {
      const fullPathArr = fullPath.split("/");
      fullPathArr[0] = ""; // Removing root dir
      const newFullPath = fullPathArr.join("/");
      setPath(newFullPath);
      refetch();
    } else console.log("This is a file");
  };

  const handleDeleteFile = (fullPath: string) => {
    const filePath = fullPath.split("/");
    const myPath = filePath[filePath.length - 1];

    Swal.fire({
      title: "Are you sure?",
      text: `You Want To Delete ${myPath} File `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteFile(fullPath)
          .then(() => {
            axiosPublic
              .delete(`/files?fullPath=${fullPath}`)
              .then((result) => {
                if (result.data.deletedCount > 0) {
                  Swal.fire({
                    title: "Deleted!",
                    text: `Your ${myPath} file has been deleted`,
                    icon: "success",
                  });
                  refetch();
                } else {
                  Swal.fire({
                    title: "Oppss!",
                    text: "Something Went Wrong Please Try Again",
                    icon: "error",
                  });
                }
              })
              .catch();
          })
          .catch();
      }
    });
  };

  // Swal.fire({
  //   title: "Deleted!",
  //   text: "Your file has been deleted.",
  //   icon: "success",
  // });

  const handelShowModal = async (fullPath) => {
    const storage = getStorage();
    try {
      const url = await getDownloadURL(ref(storage, fullPath));
      const filePath = fullPath.split("/");
      setFileName(filePath[1]);
      setDownloadUrl(url);
    } catch (err) {
      console.error("Error fetching download URL:", err);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="pt-20">
      <div className="flex justify-between items-center">
        {/* navigate component here */}
        <NavigationFolder />

        <div className="flex justify-end pt-2 pb-8 mr-5 gap-5">
          <FolderButton path={path} refetch={refetch} /> <UploadButton />
        </div>
      </div>
      <div
        style={{ backdropFilter: "blur(200px)" }}
        className="relative h-screen overflow-x-auto shadow-md sm:rounded-lg"
      >
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
          <thead className="text-xs uppercase text-slate-200 bg-primary ">
            <tr>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Modified</th>
              <th className="px-6 py-3">Size</th>
              <th className="px-6 py-3">Action</th>
              <th className="px-6 py-3">More</th>
            </tr>
          </thead>
          <tbody>
            {/* optional chaining update */}
            {filesData?.map(
              (
                { _id, name, timeCreated, size, type, fullPath, contentType },
                i
              ) => (
                <tr
                  key={_id}
                  // update just hover .
                  onClick={() => nodeClickHandler(type, fullPath)}
                  className="text-white cursor-pointer hover:bg-slate-400"
                >
                  <td className=" text-2xl pl-5 font-medium whitespace-nowrap">
                    {icons.map((elem) => {
                      if (elem.contentType === contentType)
                        return <elem.icon />;
                    })}
                  </td>
                  <td className="px-6 py-4 ">{name}</td>
                  <td className="px-6 py-4">{timeCreated.slice(0, 10)}</td>
                  <td className="px-6 py-4">
                    {(size / 1024 / 1024).toFixed(2)} MB
                  </td>
                  <td className="px-6 py-4">
                    <button
                      className={`text-3xl font-medium text-red-600  dark:text-red-500 hover:font-bold`}
                      onClick={() => handleDeleteFile(fullPath)}
                    >
                      <MdDelete />
                    </button>
                  </td>
                  <td
                    className={`px-6 py-4 ${
                      type === "folder" && "hidden"
                    } items-center`}
                  >
                    <button
                      onClick={() => handelShowModal(fullPath)}
                      className="text-2xl text-gray-500"
                    >
                      <MoreDropDown
                        fileName={fileName}
                        downloadUrl={downloadUrl}
                      />
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FilesPage;
