import {
	ref,
	getStorage,
	uploadBytes,
	UploadResult, // Typescript interface
} from "firebase/storage";
import useAuth from "./useAuth";

interface UseStorage {
	uploadFile: (path: string, file: File) => Promise<UploadResult>;
}

export default function useStorage(): UseStorage {
	const { user } = useAuth();
	const storage = getStorage();

	const uploadFile = async (path: string, file: File): Promise<UploadResult> => {
		const root = user.email;
		const userNode = ref(storage, `${root + path + file.name}`);
		return uploadBytes(userNode, file);
	};

	return {
		uploadFile,
	};
}
