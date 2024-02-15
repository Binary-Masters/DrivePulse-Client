import { User } from "firebase/auth";

interface ParentDataTypes {
	currentPath: string;
	parentPath: string;
	subDirectoryLevel: number;
	currentDirectory: string;
}

// Get necessary data for folder path navigation
// Takes user as argument to produce safe path address
// Performs string operation on given path to generate data aspects
const getFolderPathData = (path: string, type: string, user: User | null): ParentDataTypes => {
	const pathArr = path.split("/"); // Converting string into array
	let subDirectoryLevel = 0;

	// removes root directory name if applicable
	if (pathArr[0] === user?.email || pathArr[0] === user?.uid) {
		pathArr.shift();
		--subDirectoryLevel;
	}
	
	// Data
	// const currentPath = `${pathArr.join("/") || "/"}`;
	const currentPath = `/${pathArr.join("/")}`;
	const currentDirectory = pathArr[pathArr.length - 2] || "/";

	pathArr.pop(); // Removing current node
	if (type === "folder") pathArr.pop();
	pathArr.push("");

	// Data
	const parentPath = pathArr.join("/");
	subDirectoryLevel = pathArr.length - 1;
	
	return {
		currentPath,
		parentPath: parentPath || "/",
		subDirectoryLevel,
		currentDirectory,
	};
};

export default getFolderPathData;
