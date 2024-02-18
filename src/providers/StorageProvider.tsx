"use client";
import useAuth from "@/Hooks/useAuth";
import {
	UploadResult,
	deleteObject,
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL, 
} from "firebase/storage";
import React, { ReactElement, ReactNode, createContext, useState } from "react";

interface StorageInfo {
	uploadFile: (file: File) => Promise<UploadResult>;
	deleteFile: (fullPath: string) => Promise<void>;
	setPath: React.Dispatch<React.SetStateAction<string>>;
	storageLoading: boolean;
	setStorageLoading: React.Dispatch<React.SetStateAction<boolean>>;
	path: string;
	getFileURL: (fullPath: string) => Promise<string>;
}

export const StorageContext = createContext<any>({});

export default function StorageProvider({
	children,
}): ReactElement<{ children: ReactNode }> {
	const { user } = useAuth();
	const [path, setPath] = useState<string>("/");
	const [storageLoading, setStorageLoading] = useState<boolean>(true);
	const storage = getStorage();
	const root = user?.uid; // Root directory

	const getFileURL = async (fullPath: string): Promise<string> => {
		const reference = ref(storage, fullPath);
		const URL = await getDownloadURL(reference);
		return URL;
	};

	const uploadFile = async (file: File): Promise<UploadResult> => {
		setStorageLoading(true);

		const storagePath = ref(storage, `${root + path + file.name}`);
		return uploadBytes(storagePath, file);
	};

	const deleteFile = async (fullPath: string): Promise<void> => {
		setStorageLoading(true);

		const deleteRef = ref(storage, fullPath);
		return deleteObject(deleteRef);
	};

	const storageInfo: StorageInfo = {
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
