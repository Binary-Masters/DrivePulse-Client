import useAuth from "@/Hooks/useAuth";
import useStorage from "@/Hooks/useStorage";
import getFolderPathData from "@/Utils/FolderNavigation/getFolderPathData";

const NavigationFolder: React.FC = () => {
	const { path, setPath } = useStorage();
	const { user } = useAuth();
	const { parentPath } = getFolderPathData(path, "folder", user);

	const handleClick = () => {
		console.log("Parent path", parentPath);
		setPath(parentPath);
	};

	return (
		<div className="flex items-center text-white gap-2">
			<button className="text-xl cursor-pointer" onClick={ handleClick }>
				Back
			</button>
		</div>
	);
};

export default NavigationFolder;
