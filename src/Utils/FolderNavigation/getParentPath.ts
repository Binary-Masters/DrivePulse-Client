const testPath = "/folder1/folder2/folder3";
const getParentPath = (currentPath: string, type: string) => {
	const pathArr = testPath.split("/"); // Converting string into array
	console.log(pathArr);

	pathArr.pop(); // Removing current node
	if (type === "folder") pathArr.pop(); 
	pathArr.push(""); 
	const parentPath = pathArr.join("/");
	console.log(parentPath);
	
	// return parentPath;
};
