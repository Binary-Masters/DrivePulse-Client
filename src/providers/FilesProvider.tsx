import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useStorage from "@/Hooks/useStorage";
import { useQuery } from "@tanstack/react-query";
import { ReactElement, ReactNode, createContext } from "react";

interface FileData {
	checksum: string;
	owner: {
		uid: string;
		email: string;
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

export const FilesContext = createContext({});
export default function FilesProvider({
	children,
}): ReactElement<{ children: ReactNode }> {
	// Fetch all user files using uid
		const axiosPublic = useAxiosPublic();
		const { path } = useStorage();
		const { user } = useAuth();
		const {
			data: filesData = [],
			isLoading: isFilesLoading,
			refetch: refetchFiles,
		} = useQuery({
			queryKey: ["files"],
			queryFn: async () => {
				const res = await axiosPublic(
					`/files?rootdir=${user?.uid}&path=${path}`
				);
				return res.data;
			},
		});

	const filesInfo = [ filesData, isFilesLoading, refetchFiles ];
	return (
		<FilesContext.Provider value={filesInfo}>
			{children}
		</FilesContext.Provider>
	);
}
