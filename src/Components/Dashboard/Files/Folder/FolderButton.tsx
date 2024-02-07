import { useState } from "react";
import FolderModal from "./FolderModal";
import { FaFolderPlus } from "react-icons/fa";
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

interface FolderButtonProps {
	path: string;
	refetch: () => void;
}

const FolderButton: React.FC<FolderButtonProps> = ({ path, refetch }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const axiosPublic = useAxiosPublic();
	const { user } = useAuth();


	console.log('ehiid path dir', path) 
	
	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleCreateFolder = async (data: { folderName: string }) => {
		//if needed to used logic here for backend
		const folderMetadata = {
			type: "folder",
			contentType: "folder",
			bucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
			fullPath: `${user.email + path + data.folderName + "/"}`,
			name: data.folderName,
			size: 0,
		};

		try {
			await axiosPublic.post("/files", folderMetadata);
			refetch();
			closeModal();
		} catch (error) {
			console.error("Error creating folder:", error);
			// Handle error as needed
		}
	};

	return (
		<>
			<button
				className="text-[16px]  border-0 btn bg-primary text-white hover:bg-blue-600 transition-all duration-300"
				onClick={openModal}
			>
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
