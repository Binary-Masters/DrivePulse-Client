import {
	getStorage,
	ref,
	uploadBytes,
	UploadResult, // Typescript interface
} from "firebase/storage";
import useAuth from "./useAuth";

interface UseStorage {
	uploadFile: (file: File) => Promise<UploadResult>;
}

export default function useStorage(): UseStorage {
	const { user } = useAuth();
	const storage = getStorage();

	const uploadFile = async (file: File): Promise<UploadResult> => {
		const userNode = ref(storage, `${user.email}/${file.name}`);
		return uploadBytes(userNode, file);
	};

	return {
		uploadFile
	};
}
