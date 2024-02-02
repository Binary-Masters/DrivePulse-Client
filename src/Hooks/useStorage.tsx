import {
	ref,
	getStorage,
	uploadBytes,
	UploadResult, // Typescript interface
} from "firebase/storage";
import useAuth from "./useAuth";
import {useState} from "react";

interface UseStorage {
	uploadFile: (file: File) => Promise<UploadResult>;
	setPath: React.Dispatch<React.SetStateAction<string>>;
	path: string;
}

export default function useStorage(): UseStorage {
	const { user } = useAuth();
	const [path, setPath] = useState<string>("/")
	const storage = getStorage();

	const uploadFile = async (file: File): Promise<UploadResult> => {
		const root = user.email
		const userNode = ref(storage, `${root + path + file.name}`);
		return uploadBytes(userNode, file);
	};

	return {
		uploadFile,
		setPath,
		path,
	};
}
