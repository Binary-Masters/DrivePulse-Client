"use client";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { MdDelete } from "react-icons/md";

import useStorage from "@/Hooks/useStorage";


import useGetFiles from "@/Hooks/useGetFiles";


import getFolderPathData from "@/Utils/FolderNavigation/getFolderPathData";
import useAuth from "@/Hooks/useAuth";
import handleDeleteFile from "@/Utils/Files/handleDeleteNode/handleDeleteNode";
import Loading from "@/app/loading";
import { useState } from "react";
import '../profile/profile.css'
import MoreDropDown from "@/Components/Dashboard/Files/MoreDropDown/MoreDropDown";
import icons from "@/Components/Dashboard/Files/icons";
const Search : React.FC = () => {
  const [downloadUrl, setDownloadUrl] = useState<string>("");
	const [fileName, setFileName] = useState<string>("");
	const axiosPublic = useAxiosPublic();
	const { user } = useAuth();
	const { path, setPath, deleteFile } = useStorage();
	const { filesData, isFilesLoading, refetchFiles } = useGetFiles();
  // Fetching file data for appropriate user
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
	}

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
  return (
    <div style={{ backdropFilter: "blur(200px)" }}
    className="relative h-screen overflow-x-auto shadow-md sm:rounded-lg classes pt-20" >
      <p className="text-white text-3xl mx-auto flex  justify-center items-center my-3">Search your file</p>
        <table className=" w-full text-sm text-left text-gray-500 rtl:text-right ">
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
									onClick={() =>
										nodeClickHandler(type, fullPath)
									}
									className="text-white cursor-pointer hover:bg-slate-400"
								>
									<td className="pl-5 text-2xl font-medium whitespace-nowrap">
										{icons?.map((elem) => {
											if (
												elem.contentType === contentType
											)
												return <elem.icon />;
										})}
									</td>
									<td className="px-6 py-4 ">{name}</td>
									<td className="px-6 py-4">
										{timeCreated.slice(0, 10)}
									</td>
									<td className="px-6 py-4">
										{(size / 1024 / 1024).toFixed(2)} MB
									</td>
									<td className="px-6 py-4">
										<button
											className={`text-3xl font-medium text-red-600  dark:text-red-500 hover:font-bold`}
											onClick={() =>
												handleDeleteFile(hookPropObj, fullPath, type)
											}
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
											onClick={() =>
												handelShowModal(fullPath)
											}
											className="text-2xl text-gray-500"
										>
											<MoreDropDown
												fileName={name}
												fullPath={fullPath}
												downloadUrl={downloadUrl}
												bucket={bucket}
												id={_id}
												name={name}
												refetchFiles={refetchFiles}
											/>
										</button>
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
        
    </div>
  )
}

export default Search
