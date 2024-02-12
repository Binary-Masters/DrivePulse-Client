import {useContext} from "react";
import { StorageContext } from "@/providers/StorageProvider";

export default function useStorage() {
	const storageInfo = useContext(StorageContext);
	return storageInfo;
}
