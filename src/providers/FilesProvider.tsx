"use client";
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useStorage from "@/Hooks/useStorage";
import { useQuery } from "@tanstack/react-query";
import {useParams} from "next/navigation";
import { ReactElement, ReactNode, createContext, useState } from "react";

interface FileData {
	checksum: string;
	owner: {
		uid: string;
		email: string;
		status: number;
	};
	type: string;
	bucket: string;
	fullPath: string;
	name: string;
	size: number;
	contentType: string;
	timeCreated: string;
	updated: string;
	rootDirectory: string;
	parentPath: string;
}

export const FilesContext = createContext<any>({});
export default function FilesProvider({
	children,
}): ReactElement<{ children: ReactNode }> {
	// Fetch all user files using uid
	const axiosPublic = useAxiosPublic();
	const { path } = useStorage();
	const { user } = useAuth();
	const params = useParams();
	const id = params.id !== "root" ? params.id : ""
	console.log(id);
	const {
		data: filesData = [],
		isLoading: isFilesLoading,
		refetch: refetchFiles,
	} = useQuery({
		queryKey: ["files", path, id],
		queryFn: async () => {
			const { data } = await axiosPublic.get(
				`/files?rootdir=${user?.uid}&path=${path}&id=${id}`
			);
			return data;
		},
	});

	const filesInfo = { filesData, isFilesLoading, refetchFiles };
	return (
		<FilesContext.Provider value={filesInfo}>
			{children}
		</FilesContext.Provider>
	);
}
