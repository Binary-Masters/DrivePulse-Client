"use client";
import MoreDropDrown from "@/Components/Dashboard/Files/More";
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import FolderButton from "./Folder/FolderButton";
import NewFile from "./Folder/NewFile";
import Upload from "./Folder/Upload";
import useStorage from "@/Hooks/useStorage";

const FilesPage = () => {
  const axiosPublic = useAxiosPublic();
  const { path, setPath } = useStorage();
  const { user } = useAuth();

  // Fetching file data for appropriate user
  const {
    data: files = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/files?rootdir=${user.email}&path=${path}` // Fetching with email
      );
      return data;
    },
  });

  const nodeClickHandler = (type: string, fullPath: string) => {
    if (type === "folder") {
      const fullPathArr = fullPath.split("/");
      fullPathArr[0] = ""; // Removing root dir
      const newFullPath = fullPathArr.join("/");
      setPath(newFullPath);
      refetch();
    } else console.log("This is a file");
  };

  return (
    <div className="pt-[80px]">
      <div className="flex gap-5 justify-end mr-5 pb-8 pt-2">
        <FolderButton /> <NewFile /> <Upload />
      </div>
      <div
        style={{ backdropFilter: "blur(200px)" }}
        className="relative overflow-x-auto shadow-md sm:rounded-lg"
      >
        <table className="w-full h-100vh text-sm text-left text-gray-500 rtl:text-right ">
          <thead className="text-xs text-slate-200 uppercase bg-primary ">
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
            {files.map(
              ({ _id, name, timeCreated, size, type, fullPath }, i) => (
                <tr
                  key={_id}
                  onClick={() => nodeClickHandler(type, fullPath)}
                  className="cursor-pointer"
                >
                  <td className="flex items-center justify-center px-6 py-4 text-2xl font-medium whitespace-nowrap">
                    {type === "folder" && <FaFolder />}
                  </td>
                  <td className="px-6 py-4 ">{name}</td>
                  <td className="px-6 py-4">{timeCreated}</td>
                  <td className="px-6 py-4">{size}</td>
                  <td className="px-6 py-4">
                    <Link
                      href="#"
                      className="text-3xl font-medium text-red-600 dark:text-red-500 hover:font-bold"
                    >
                      <MdDelete />
                    </Link>
                  </td>
                  <td className={`px-6 py-4 ${type === "folder" && "hidden"}`}>
                    <Link href="#" className="text-2xl">
                      <MoreDropDrown></MoreDropDrown>
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
