import {
	ref,
	getStorage,
	uploadBytes,
	deleteObject,
	UploadResult, // Typescript interface
} from "firebase/storage";
import useAuth from "./useAuth";
import { useState } from "react";

interface UseStorage {
	uploadFile: (file: File) => Promise<UploadResult>;
	deleteFile: (fullPath: string) => Promise<void>;
	setPath: React.Dispatch<React.SetStateAction<string>>;
	path: string;
}

export default function useStorage(): UseStorage {
	const { user } = useAuth();
	const [path, setPath] = useState<string>("/");
	const storage = getStorage();

	const uploadFile = async (file: File): Promise<UploadResult> => {
		const root = user.email;
		const userNode = ref(storage, `${root + path + file.name}`);
		return uploadBytes(userNode, file);
	};

	const deleteFile = async (fullPath: string): Promise<void> => {
		const deleteRef = ref(storage, fullPath);
		return deleteObject(deleteRef);
	};

	return {
		uploadFile,
		setPath,
		deleteFile,
		path,
	};
}
