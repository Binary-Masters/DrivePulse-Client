import {FilesContext} from "@/providers/FilesProvider";
import {useContext} from "react";

export default function useGetFiles() {
	const filesInfo = useContext(FilesContext);
	return filesInfo;
}
