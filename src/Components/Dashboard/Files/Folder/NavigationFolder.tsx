import useStorage from "@/Hooks/useStorage";
import React from "react";

interface NavigationFolderProps {
	refetch: () => void;
}

const NavigationFolder: React.FC<NavigationFolderProps> = (refetch) => {
	const { path } = useStorage();
	
	
	
	return (
		<div className="flex items-center text-white gap-2">
			<button className="text-xl cursor-pointer">{ path }</button>
		</div>
	);
};

export default NavigationFolder;

