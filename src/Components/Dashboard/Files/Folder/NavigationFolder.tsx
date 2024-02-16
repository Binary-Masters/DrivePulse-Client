import useAuth from "@/Hooks/useAuth";
import { IoArrowBack } from "react-icons/io5";
import useStorage from "@/Hooks/useStorage";
import getFolderPathData from "@/Utils/FolderNavigation/getFolderPathData";
import { useEffect, useState } from "react";
import useGetFiles from "@/Hooks/useGetFiles";

interface HistoryEntry {
	currentPath: string;
	parentPath: string;
	currentDirectory: string;
	subDirectoryLevel: number;
}

const NavigationFolder: React.FC = () => {
	const { path, setPath } = useStorage();
	const { user } = useAuth();
	const { refetchFiles } = useGetFiles();
	const [folderHistoryArr, setFolderHistoryArr] = useState<HistoryEntry[]>(
		[]
	);

	const handleClick = (current: string) => {
		setPath(current);
		refetchFiles();
	};

	// Creates a history of already visisted folders
	useEffect(() => {
		let tempPath = path;
		const tempHistory: HistoryEntry[] = [];
		const rootEntry = {
			currentPath: "/",
			parentPath: "",
			currentDirectory: "/",
			subDirectoryLevel: 0,
		};

		while (tempPath !== "/") {
			const historyEntry = getFolderPathData(tempPath, "folder", user);
			tempHistory.unshift(historyEntry);
			tempPath = historyEntry.parentPath;
		}
		tempHistory.unshift(rootEntry);

		setFolderHistoryArr(tempHistory);
	}, [user, path]);

	return (
		<div className="flex items-center text-xl text-white gap-2">
			{folderHistoryArr.map(
				({ currentPath, currentDirectory, subDirectoryLevel }, i) => (
					<span
						onClick={() => handleClick(currentPath)}
						key={subDirectoryLevel}
					>
						<span className="flex items-center gap-2">
							<span className="cursor-pointer hover:underline">
								{currentDirectory}
							</span>
							<span className="text-base text-white/40">
								{i ? "/" : ""}
							</span>
						</span>
					</span>
				)
			)}
		</div>
	);
};

export default NavigationFolder;
