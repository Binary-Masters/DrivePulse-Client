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
const getFolderPathData = (
	path: string,
	type: string,
	user: User | null
): ParentDataTypes => {
 // Remove the rootDir from the pathAddress
  const trimmedPath = user && path.replace(user.uid, '');

  // Split the path into an array of directory names
  const directories = trimmedPath ? trimmedPath.split('/').filter(Boolean) : []; // Remove empty strings

  // Extract the required information
  let currentPath = '/' + directories.join('/');
  if(type === "folder") currentPath = "/" + directories.join("/") + "/";
  const parentPath = directories.length > 1 ? '/' + directories.slice(0, -1).join('/') + '/' : '/';
  const subDirectoryLevel = directories.length;
  const currentDirectory = directories[directories.length - 1];

	return {
		currentPath,
		parentPath: parentPath || "/",
		subDirectoryLevel,
		currentDirectory,
	};
};

export default getFolderPathData;
