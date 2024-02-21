import getFolderPathData from "../FolderNavigation/getFolderPathData";

const nodeClickHandler = (
	hookPropObj: any,
	type: string,
	fullPath: string,
) => {
	const { setPath, refetchFiles, user } = hookPropObj;
	if (type === "folder") {
		const { currentPath } = getFolderPathData(fullPath, type, user);
		setPath(currentPath);
		refetchFiles();
	} else console.log("This is a file");
};

export default nodeClickHandler;
