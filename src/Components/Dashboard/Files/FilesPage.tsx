"use client";
import MoreDropDrown from "@/Components/Dashboard/Files/More";
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import FolderButton from "./Folder/FolderButton";
import useStorage from "@/Hooks/useStorage";
import icons from "./icons";
import { useState } from "react";
import NavigationFolder from "./Folder/NavigationFolder";
import useGetFilesByEmail from "@/Hooks/useGetFilesByEmail";
import UploadButton from "./UploadButton&Modal/UploadButton";

const FilesPage: React.FC  = () => {
  const [currentPath, setCurrentPath] = useState([""]);

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

  const handleDeleteFile = (filePath: string) => {
    deleteFile(filePath)
      .then((result) => {
        console.log(result);
        axiosPublic
          .delete(`/files?fullPath=${filePath}`)
          .then((result) => {
            console.log(result);
            refetch();
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

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
            {filesData.map(
              (
                { _id, name, timeCreated, size, type, fullPath, contentType },
                i
              ) => (
                <tr
                  key={_id}
                  onClick={() => nodeClickHandler(type, fullPath)}
                  className="text-white cursor-pointer"
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
                    {/* <Link */}
                    {/* 	href="#" */}
                    {/* 	className={`text-3xl ${ */}
                    {/* 		type === "folder" && "hidden" */}
                    {/* 	} font-medium text-red-600 dark:text-red-500 hover:font-bold`} */}
                    {/* 	onClick={() => */}
                    {/* 		handleDeleteFile(fullPath) */}
                    {/* 	} */}
                    {/* > */}
                    {/* 	<MdDelete /> */}
                    {/* </Link> */}
                    <Link
                      href="#"
                      className={`text-3xl font-medium text-red-600 dark:text-red-500 hover:font-bold`}
                      onClick={() => handleDeleteFile(fullPath)}
                    >
                      <MdDelete />
                    </Link>
                  </td>
                  <td className={`px-6 py-4 ${type === "folder" && "hidden"}`}>
                    <Link href="#" className="text-2xl text-gray-500">
                      <MoreDropDrown
                        // fileName={name}
                        fullPath={fullPath}
                      ></MoreDropDrown>
                    </Link>
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
