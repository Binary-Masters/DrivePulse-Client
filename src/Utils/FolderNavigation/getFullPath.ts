const getFullPath = (path: string): string => {
	const pathArr = path.split("/") // converting path string into array
	pathArr[0] = "" // Removed root directory
	const fullPath = pathArr.join("/");
	return fullPath;
}

export default getFullPath;
