import useAuth from "@/Hooks/useAuth";
import useStorage from "@/Hooks/useStorage";
import getFolderPathData from "@/Utils/FolderNavigation/getFolderPathData";
import { useEffect, useState } from "react";

interface HistoryEntry {
	currentPath: string;
	parentPath: string;
	currentDirectory: string;
	subDirectoryLevel: number;
}

const NavigationFolder: React.FC = () => {
	const { path, setPath } = useStorage();
	const { user } = useAuth();
	const [folderHistoryArr, setFolderHistoryArr] = useState<HistoryEntry[]>(
		[]
	);

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
	console.log(path);
	console.log(folderHistoryArr);

	return (
		<div className="flex items-center text-xl text-white debug gap-2">
			{folderHistoryArr.map(
				({
					currentPath,
					parentPath,
					currentDirectory,
					subDirectoryLevel,
				}) => (
					<p key={subDirectoryLevel}>{currentDirectory}</p>
				)
			)}
		</div>
	);
};

export default NavigationFolder;
