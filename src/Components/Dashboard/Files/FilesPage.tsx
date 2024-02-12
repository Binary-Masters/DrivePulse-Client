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
import getFullPath from "@/Utils/FolderNavigation/getFullPath";

const FilesPage: React.FC = () => {
	const [downloadUrl, setDownloadUrl] = useState<string>("");
	const [fileName, setFileName] = useState<string>("");
	const axiosPublic = useAxiosPublic();
	const { path, setPath, deleteFile } = useStorage();
	const [filesData, loading, refetch] = useGetFilesByEmail();

	// Fetching file data for appropriate user

	const nodeClickHandler = (type: string, fullPath: string) => {
		if (type === "folder") {
			const newFullPath = getFullPath(fullPath);
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

	return (
		<div className="px-4 pt-20">
			<div className="flex items-center justify-between">
				{/* navigate component here */}
				<NavigationFolder refetch={refetch} />

				<div className="flex justify-end pt-2 pb-8 mr-5 gap-5">
					<FolderButton path={path} refetch={refetch} />{" "}
					<UploadButton />
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
								{
									_id,
									name,
									timeCreated,
									size,
									type,
									fullPath,
									contentType,
								},
								i
							) => (
								<tr
									key={_id}
									// update just hover .
									onClick={() =>
										nodeClickHandler(type, fullPath)
									}
									className="text-white cursor-pointer hover:bg-slate-400"
								>
									<td className="pl-5 text-2xl font-medium whitespace-nowrap">
										{icons.map((elem) => {
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
												handleDeleteFile(fullPath)
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
