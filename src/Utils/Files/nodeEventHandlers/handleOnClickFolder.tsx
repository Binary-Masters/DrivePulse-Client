import getFolderPathData from "@/Utils/FolderNavigation/getFolderPathData";

const handleOnClickFolder = (
	hookPropObj: any,
	type: string,
	fullPath: string
) => {
	const { setPath, refetchFiles, user } = hookPropObj;
	const { currentPath } = getFolderPathData(fullPath, type, user);
	setPath(currentPath);
	refetchFiles();
};

export default handleOnClickFolder;
