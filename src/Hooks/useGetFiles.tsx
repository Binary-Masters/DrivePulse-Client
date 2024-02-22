import {FilesContext} from "@/providers/FilesProvider";
import {useContext} from "react";

const useGetFiles = () => {
	const filesInfo = useContext(FilesContext);
	console.log(filesInfo);
	return filesInfo;
}

export default useGetFiles;
