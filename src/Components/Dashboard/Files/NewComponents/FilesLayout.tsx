"use client";

import { useState } from "react";
import ListView from "./Views/ListView";
import GridView from "./Views/GridView";
import useAuth from "@/Hooks/useAuth";
import useGetFiles from "@/Hooks/useGetFiles";
import useStorage from "@/Hooks/useStorage";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

export default function FilesLayout() {
	const { user } = useAuth();
	const { filesData, refetchFiles } = useGetFiles();
	const { setPath, deleteFile } = useStorage();
	const axiosPublic = useAxiosPublic();
	const [view, setView] = useState<"list" | "grid">("grid");
	const hookPropObj = {
		user,
		filesData,
		refetchFiles,
		setPath,
		axiosInstance: axiosPublic,
		deleteFile,
	};

	return (
		<div>
			{view === "list" ? (
				<ListView hookPropObj={hookPropObj} />
			) : (
				<GridView hookPropObj={hookPropObj} />
			)}
		</div>
	);
}
