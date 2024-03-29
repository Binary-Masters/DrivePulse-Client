"use client";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { MdDelete } from "react-icons/md";
import FolderButton from "./Folder/FolderButton";
import useStorage from "@/Hooks/useStorage";
import icons from "./icons";
import NavigationFolder from "./Folder/NavigationFolder";
import useGetFiles from "@/Hooks/useGetFiles";
import UploadButton from "./UploadButton&Modal/UploadButton";
import MoreDropDown from "./MoreDropDown/MoreDropDown";
import getFolderPathData from "@/Utils/FolderNavigation/getFolderPathData";
import useAuth from "@/Hooks/useAuth";
import Loading from "@/app/loading";
import { useContext, useState } from "react";
import DropDownView from "@/Components/DropDownView/DropDownView";
import FolderMoreInfo from "@/Components/FolderMorInfo/FolderMoreInfo";
import NodePreview from "./Preview/NodePreview";
import CreateFile from "./CreateFile/CreateFile";
import { useRouter } from "next/navigation";
import { StorageContext } from "@/providers/StorageProvider";
import handleStoreChangeFileTrash from "@/Utils/Files/handelChangeFileLocation/handleStoreChangeFileTrash";

const FilesPage: React.FC = () => {
  const [isView, setIsView] = useState("list");
  const [downloadUrl, setDownloadUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const { path, setPath, deleteFile } = useStorage();
  const { filesData, isFilesLoading, refetchFiles } = useGetFiles();
  const filterLocalStoreData = filesData?.filter(
    (item) => item.store === "Local"
  );
  const router = useRouter();
  // This is for File Preview
  const { getFileURL } = useContext(StorageContext);

  // Fetching file data for appropriate user
  const nodeClickHandler = async (
    type: string,
    fullPath: string,
    thumbnail: any,
    contentType,
    _id,
    name
  ) => {
    if (type === "folder") {
      const { currentPath } = getFolderPathData(fullPath, type, user);
      setPath(currentPath);
      refetchFiles();
    } else if (contentType === "text/plain") {
      router.push(`/dashboard/text-editor/${_id}?name=${name}`);
    } else console.log("This is a file");

    // File Preview start here
    if (type !== "folder" && contentType !== "text/plain") {
      const url = await getFileURL(fullPath);
      console.log(url);
      if (url) {
        window.open(url, "_blank");
      }
    }
    // file preview code end
  };

  // to pass hook props down to plain js utilies
  const hookPropObj = {
    user,
    router,
    setPath,
    deleteFile,
    axiosInstance: axiosPublic,
    refetchFiles,
  };

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
  if (isFilesLoading) {
    return <Loading />;
  }
  const handleIsViewChange = (newView) => {
    setIsView(newView);
  };

  return (
    <div className="pt-20">
      <div className="flex items-center justify-between mx-3 my-5">
        {/* navigate component here */}
        <NavigationFolder />

        <div className="flex items-center gap-3">
          <DropDownView onIsViewChange={handleIsViewChange} />
          <FolderButton path={path} />
          <UploadButton />
          <CreateFile />
        </div>
      </div>
      {/* list view */}
      {isView === "list" && (
        <div
          style={{ backdropFilter: "blur(200px)" }}
          className="relative h-screen overflow-x-auto shadow-md sm:rounded-lg mx-3">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
            <thead className="text-xs uppercase text-slate-200 bg-primary">
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
                (
                  {
                    _id,
                    name,
                    timeCreated,
                    size,
                    type,
                    fullPath,
                    contentType,
                    bucket,
                    thumbnail,
                  },
                  i
                ) => (
                  <tr
                    key={_id}
                    // update just hover .
                    className="text-white cursor-pointer hover:bg-slate-700">
                    <td className="pl-5 text-2xl font-medium whitespace-nowrap">
                      {icons?.map((elem) => {
                        if (elem.contentType === contentType)
                          return <elem.icon />;
                      })}
                    </td>
                    <td
                      onClick={() =>
                        nodeClickHandler(
                          type,
                          fullPath,
                          thumbnail,
                          contentType,
                          _id,
                          name
                        )
                      }
                      className="px-6 py-4 ">
                      {name}
                    </td>
                    <td
                      onClick={() =>
                        nodeClickHandler(
                          type,
                          fullPath,
                          thumbnail,
                          contentType,
                          _id,
                          name
                        )
                      }
                      className="px-6 py-4">
                      {timeCreated.slice(0, 10)}
                    </td>
                    <td
                      onClick={() =>
                        nodeClickHandler(
                          type,
                          fullPath,
                          thumbnail,
                          contentType,
                          _id,
                          name
                        )
                      }
                      className="px-6 py-4">
                      {(size / 1024 / 1024).toFixed(2)} MB
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className={`text-3xl font-medium text-red-600  dark:text-red-500 hover:font-bold`}
                        onClick={() =>
                          handleStoreChangeFileTrash(hookPropObj, fullPath, _id)
                        }>
                        <MdDelete />
                      </button>
                    </td>
                   <td>
                   <button
                      onClick={() => handelShowModal(fullPath)}
                      className="text-2xl text-gray-500 ">
                      {
                        <MoreDropDown
                          fileName={name}
                          fullPath={fullPath}
                          downloadUrl={downloadUrl}
                          bucket={bucket}
                          id={_id}
                          name={name}
                          refetchFiles={refetchFiles}
                          type={type}
                        />
                      }
                    </button>
                   </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* medium icon view */}
      {isView === "medium" && (
        <div className="items-center mx-3 grid grid-rows-4 md:grid-cols-6 lg:grid-cols-10 gap-8">
          {filterLocalStoreData?.map((file, index) => (
            <div className="relative cursor-pointer" key={index}>
              <div
                className="w-full"
                onClick={() =>
                  nodeClickHandler(
                    file?.type,
                    file?.fullPath,
                    file?.thumbnail,
                    file?.contentType,
                    file?._id,
                    file?.name
                  )
                }>
                {file.contentType.startsWith("image/") ? (
                  <NodePreview
                    thumbnail={file.thumbnail}
                    height={100}
                    width={100}
                  />
                ) : (
                  icons?.map((elem) => {
                    if (elem.contentType === file.contentType)
                      return <elem.icon className="w-full h-full text-white" />;
                  })
                )}
                {/* <MdImage className="text-[100px] text-white"/> */}
              </div>
              <div>
                <h2 className="text-white">{(file?.name).slice(0, 10)}</h2>
              </div>
              <div className="absolute text-xl text-white -right-4 top-4">
                <FolderMoreInfo
                  info={file}
                  fileName={fileName}
                  downloadUrL={downloadUrl}
                  refetchFiles={refetchFiles}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* large icons view */}
      {isView === "large" && (
        <div className="items-center mx-3 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {filterLocalStoreData?.map((file, index) => (
            <div className="relative cursor-pointer" key={index}>
              <div
                className="w-full"
                onClick={() =>
                  nodeClickHandler(
                    file?.type,
                    file?.fullPath,
                    file?.thumbnail,
                    file?.contentType,
                    file?._id,
                    file?.name
                  )
                }>
                {file.contentType.startsWith("image/") ? (
                  <NodePreview
                    thumbnail={file.thumbnail}
                    height={130}
                    width={130}
                  />
                ) : (
                  icons?.map((elem) => {
                    if (elem.contentType === file.contentType)
                      return <elem.icon className="w-full h-full text-white" />;
                  })
                )}
                <h2 className="text-white">{(file?.name).slice(0, 10)}</h2>
              </div>
              <div className="absolute text-2xl text-white -right-5 top-4">
                <FolderMoreInfo
                  info={file}
                  fileName={fileName}
                  downloadUrL={downloadUrl}
                  refetchFiles={refetchFiles}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilesPage;
