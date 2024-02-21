"use client";
import { MdDelete, MdImage } from "react-icons/md";
import getFolderPathData from "@/Utils/FolderNavigation/getFolderPathData";
import handleDeleteFile from "@/Utils/Files/handleDeleteNode/handleDeleteNode";
import Swal from "sweetalert2";
import icons from "@/Components/Dashboard/Files/icons";
import Loading from "@/app/loading";
import useGetFiles from "@/Hooks/useGetFiles";
import useStorage from "@/Hooks/useStorage";
import { useRouter } from "next/navigation";
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { FaTrashRestore } from "react-icons/fa";

const TrushFiles = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { path, setPath, deleteFile } = useStorage();
  const { filesData, isFilesLoading, refetchFiles } = useGetFiles();
  const router = useRouter();
  console.log(filesData);
  // Fetching file data for appropriate user
  const filterLocalStoreData = filesData?.filter(
    (item) => item.owner.store === "Trush"
  );
  const nodeClickHandler = (type: string, fullPath: string) => {
    if (type === "folder") {
      const { currentPath } = getFolderPathData(fullPath, type, user);
      setPath(currentPath);
      refetchFiles();
    } else console.log("This is a file");
  };

  // to pass hook props down to plain js utilies
  const hookPropObj = {
    user,
    setPath,
    deleteFile,
    axiosInstance: axiosPublic,
    refetchFiles,
  };

  const handleStoreChangeFile = (fullPath, id) => {
    const filePath = fullPath.split("/");
    const myPath = filePath[filePath.length - 1];
    Swal.fire({
      title: "Are you sure?",
      text: `You want to Restore ${myPath} `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Restore it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic
          .patch(`/store-file?id=${id}`, { store: "Local" })
          .then(() => {
            refetchFiles();
            Swal.fire({
              title: `${myPath} has been Restored`,
              text: `Want To Go Files Page`,
              icon: "success",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, Go!",
            }).then((result) => {
              if (result.isConfirmed) {
                router.push("/dashboard/files");
              }
            });
          })
          .catch();
      }
    });
  };
  if (isFilesLoading) {
    return <Loading />;
  }
  return (
    <div className="pt-20">
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
            {filterLocalStoreData?.map(
              ({
                _id,
                name,
                timeCreated,
                size,
                type,
                fullPath,
                contentType,
                bucket,
              }) => (
                <tr
                  key={_id}
                  // update just hover .
                  className="text-white cursor-pointer hover:bg-slate-700"
                >
                  <td
                    onClick={() => nodeClickHandler(type, fullPath)}
                    className="pl-5 text-2xl font-medium whitespace-nowrap"
                  >
                    {icons?.map((elem) => {
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
                      className={`text-3xl tooltip tooltip-top font-medium text-red-600  dark:text-red-500 hover:font-bold`}
                      data-tip="Permanet Delete"
                      onClick={() =>
                        handleDeleteFile(hookPropObj, fullPath, type)
                      }
                    >
                      <MdDelete />
                    </button>
                  </td>
                  <td className={`px-6 py-4 items-center`}>
                    <button
                      onClick={() => handleStoreChangeFile(fullPath, _id)}
                      className="tooltip tooltip-top text-2xl text-green-500"
                      data-tip="Want To Restore"
                    >
                      <FaTrashRestore />
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

export default TrushFiles;
