import useAuth from "@/Hooks/useAuth";
import { IoArrowBack } from "react-icons/io5";
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
			<button className="text-xs md:text-[16px]  border-0 btn bg-primary text-white hover:bg-blue-600 transition-all duration-300" onClick={ handleClick }>
				
				<IoArrowBack className="text-xl  "/>
                <span className="hidden md:block">Back</span>
			</button>
		</div>
	);
};

export default NavigationFolder;
