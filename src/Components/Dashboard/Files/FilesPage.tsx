"use client";

// icons
import icons from "./icons";
import { MdDelete } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";

// Utils
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import handleDeleteFile from "@/Utils/Files/handleDeleteNode/handleDeleteNode";
import nodeClickHandler from "@/Utils/Files/nodeClickHandler";

// Components
import Link from "next/link";
import FolderButton from "./Folder/FolderButton";
import NavigationFolder from "./Folder/NavigationFolder";
import UploadButton from "./UploadButton&Modal/UploadButton";
import MoreDropDown from "./MoreDropDown";
import Loading from "@/app/loading";
import DropDownView from "@/Components/DropDownView/DropDownView";

// Hooks
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useStorage from "@/Hooks/useStorage";
import useGetFiles from "@/Hooks/useGetFiles";
import useAuth from "@/Hooks/useAuth";
import { useState } from "react";
import ViewLayout from "./Views/ViewLayout";
import { useRouter } from "next/navigation";

const FilesPage: React.FC<{ id: string }> = () => {
	const [view, setView] = useState("list");
	const [downloadUrl, setDownloadUrl] = useState<string>("");
	const [fileName, setFileName] = useState<string>("");
	const axiosPublic = useAxiosPublic();
	const { user } = useAuth();
	const { path, setPath, deleteFile } = useStorage();
	const router = useRouter();
	const { filesData, isFilesLoading, refetchFiles, setId } = useGetFiles();

	// to pass hook props down to plain js utilies
	const hookPropObj = {
		user,
		setPath,
		deleteFile,
		axiosInstance: axiosPublic,
		refetchFiles,
		filesData,
		downloadUrl,
		fileName,
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
	const handleViewChange = (newView) => {
		setView(newView);
	};

	if (isFilesLoading) {
		return <Loading />;
	}
	return (
		<div className="pt-20">
			<div className="flex items-center justify-between mx-3 my-5">
				{/* navigate component here */}
				<NavigationFolder />

				<div className="flex items-center gap-3">
					<DropDownView onIsViewChange={handleViewChange} />
					<FolderButton path={path} />
					<UploadButton />
					<Link
						className="text-xs md:text-[16px]  border-0 btn bg-primary text-white hover:bg-blue-600 transition-all duration-300"
						href={"/dashboard/create-file"}
					>
						<IoCreateOutline className="text-xl " />
						<span className="hidden md:block">Create File</span>
					</Link>
				</div>
			</div>
			{/* list view */}
			{view === "list" && (
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
										bucket,
									},
									i
								) => (
									<tr
										key={_id}
										// update just hover .
										onClick={() => {
											nodeClickHandler(
												hookPropObj,
												type,
												fullPath,
											);
											router.push(
												`/dashboard/files/${_id}`
											);
										}}
										className="text-white cursor-pointer hover:bg-slate-700"
									>
										<td className="pl-5 text-2xl font-medium whitespace-nowrap">
											{icons?.map((elem) => {
												if (
													elem.contentType ===
													contentType
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
													handleDeleteFile(
														hookPropObj,
														fullPath,
														type
													)
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
												className="text-2xl text-gray-500 "
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
			)}
			<ViewLayout hookPropObj={hookPropObj} view={view} />
		</div>
	);
};

export default FilesPage;
