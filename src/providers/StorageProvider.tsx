"use client";
import useAuth from "@/Hooks/useAuth";
import {
	deleteObject,
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL, 
	UploadTask,
} from "firebase/storage";
import React, { ReactElement, ReactNode, createContext, useState } from "react";

interface UploadFileInfo {
	name: string;
	size: number;
	status: string;
}

interface StorageInfo {
	uploadFile: (file: File) => UploadTask;
	deleteFile: (fullPath: string) => Promise<void>;
	setPath: React.Dispatch<React.SetStateAction<string>>;
	storageLoading: boolean;
	setStorageLoading: React.Dispatch<React.SetStateAction<boolean>>;
	uploadProgress: number;
	setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
	uploadFileInfo: UploadFileInfo | null,
	setUploadFileInfo: React.Dispatch<React.SetStateAction<UploadFileInfo | null>>;
	path: string;
	getFileURL: (fullPath: string) => Promise<string>;
}


export const StorageContext = createContext<any>({});

export default function StorageProvider({
	children,
}): ReactElement<{ children: ReactNode }> {
	const { user } = useAuth();
	const [path, setPath] = useState<string>("/");
	const [uploadProgress, setUploadProgress] = useState<number>(0);
	const [storageLoading, setStorageLoading] = useState<boolean>(true);
	const [uploadFileInfo, setUploadFileInfo] = useState<UploadFileInfo | null>(null)
	const storage = getStorage();
	const root = user?.uid; // Root directory

	const getFileURL = async (fullPath: string): Promise<string> => {
		const reference = ref(storage, fullPath);
		const URL = await getDownloadURL(reference);
		return URL;
	};

	const uploadFile = (file: File): UploadTask => {
		setStorageLoading(true);

		const storagePath = ref(storage, `${root + path + file.name}`);
		return uploadBytesResumable(storagePath, file);
	};

	const deleteFile = async (fullPath: string): Promise<void> => {
		setStorageLoading(true);

		const deleteRef = ref(storage, fullPath);
		return deleteObject(deleteRef);
	};

	const storageInfo: StorageInfo = {
		uploadFileInfo,
		setUploadFileInfo,
		uploadProgress,
		setUploadProgress,
		uploadFile,
		setPath,
		getFileURL,
		deleteFile,
		path,
		storageLoading,
		setStorageLoading, // To manipulate loading state when Promise is resolved or rejected
	};

	return (
		<StorageContext.Provider value={storageInfo}>
			{children}
		</StorageContext.Provider>
	);
}
