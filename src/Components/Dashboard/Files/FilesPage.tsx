"use client";
import MoreDropDrown from "@/Components/Dashboard/Files/More";
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { FaFolder } from "react-icons/fa";
import FolderButton from "./Folder/FolderButton";
import Upload from "./Folder/Upload";
import useStorage from "@/Hooks/useStorage";
import NavigationFolder from "./Folder/NavigationFolder";
import { useEffect, useState } from "react";

const FilesPage = () => {
	const [currentPath, setCurrentPath] = useState(['']);
	
	const axiosPublic = useAxiosPublic();
	const { path, setPath } = useStorage();
	const { user } = useAuth();

	console.log(path)
	console.log('current path', currentPath)

	const handleNavigate = (path) => {
		setCurrentPath(path);
		console.log('Current Path:', currentPath);
	};

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
			fullPathArr[0] = "" // Removing root dir
			const newFullPath = fullPathArr.join("/");
			setPath(newFullPath);
			refetch();
		} else console.log("This is a file");
	};

	return (
		<div className="mt-20">
			<div className="flex justify-between pt-2 ">
				<NavigationFolder currentPath={currentPath} onNavigate={handleNavigate} />
				<div className="flex justify-end pb-8 mr-5 gap-5">
					<FolderButton onNavigate={handleNavigate} path={path} refetch={refetch} currentPath={currentPath} />
					<Upload />
				</div>
			</div>
			<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
				<table className="w-full text-sm text-left text-gray-500 rtl:text-right ">
					<thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
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
							(
								{
									_id,
									name,
									timeCreated,
									size,
									type,
									fullPath,
								},
								i
							) => (
								<tr
									key={_id}
									onClick={() =>
										nodeClickHandler(type, fullPath)
									}
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
									<td
										className={`px-6 py-4 ${type === "folder" && "hidden"
											}`}
									>
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
