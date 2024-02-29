import getFolderPathData from "@/Utils/FolderNavigation/getFolderPathData";

const handleOnClickNode = (
	hookPropObj: any,
	type: string,
	fullPath: string
) => {
	if (type === "folder") {
		const { setPath, refetchFiles, user } = hookPropObj;
		const { currentPath } = getFolderPathData(fullPath, type, user);
		setPath(currentPath);
		refetchFiles();
	}
};

export default handleOnClickNode;
