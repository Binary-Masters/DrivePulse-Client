import {
	getStorage,
	ref,
	uploadBytes,
	UploadResult, // Typescript interface
} from "firebase/storage";

interface UseStorage {
	uploadFile: (file: File) => Promise<UploadResult>;
}

export default function useStorage(): UseStorage {
	const storage = getStorage();

	const uploadFile = async (file: File): Promise<UploadResult> => {
		const userNode = ref(storage, `[username]/${file.name}`);
		return uploadBytes(userNode, file);
	};

	return {
		uploadFile
	};
}
