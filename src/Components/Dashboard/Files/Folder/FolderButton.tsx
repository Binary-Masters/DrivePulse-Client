import { useState } from "react";
import FolderModal from "./FolderModal";
import { FaFolderPlus } from "react-icons/fa";
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const FolderButton = ({ path, refetch }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const axiosPublic = useAxiosPublic();
	const { user } = useAuth();

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleCreateFolder = (data: { folderName: string }) => {
		//if needed to used logic here for backend
		const pPath = path.split("/")
		const parentPath = pPath[pPath.length - 1];
		const folderMetadata = {
			type: "folder",
			bucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
			fullPath: `${ user.email + path + data.folderName + "/" }`,
			name: data.folderName,
			size: 0,
			rootDirectory: user.email,
			parentPath: parentPath || "/",
		};
		axiosPublic.post("/files", folderMetadata)
		.then(() => refetch());
		closeModal();
	};

	return (
		<>
			<button className="text-sm btn" onClick={openModal}>
				<FaFolderPlus /> New Folder
			</button>
			<FolderModal
				isOpen={isModalOpen}
				onRequestClose={closeModal}
				onSubmit={handleCreateFolder}
			/>
		</>
	);
};

export default FolderButton;

