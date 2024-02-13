import {FilesContext} from "@/providers/FilesProvider";
import {useContext} from "react";

const useGetFiles = () => {
	const filesInfo = useContext(FilesContext);
	return filesInfo;
}

export default useGetFiles;
