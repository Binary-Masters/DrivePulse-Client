import { useState } from "react";
import FolderModal from "./FolderModal";
import { FaFolderPlus } from "react-icons/fa";
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useGetFiles from "@/Hooks/useGetFiles";


interface FolderButtonProps {
	path: string;
}

const FolderButton: React.FC<FolderButtonProps> = ({ path }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const axiosPublic = useAxiosPublic();
	const { refetchFiles, filesData } = useGetFiles();
	const { user } = useAuth();

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};

	const handleCreateFolder = async (data: { folderName: string }) => {
		// Preparing database entry
		const folderMetadata = {
			checksum: "",
			type: "folder",
			owner: { uid: user.uid, email: user.email },
			contentType: "folder",
			bucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
			fullPath: `${user.uid + path + data.folderName + "/"}`,
			name: data.folderName,
			size: 0,
		};
		console.log(folderMetadata);

		axiosPublic.post("/files", folderMetadata)
		.then(() => {
			refetchFiles();
			closeModal();
			console.log(filesData);
		})
		.catch(err => console.log(err));
	};

	return (
		<>
			<button
				className="text-xs md:text-[16px]  border-0 btn  bg-primary text-white hover:bg-blue-600 transition-all duration-300"
				onClick={openModal}
			>
				<FaFolderPlus className="text-xl" />
				<span className="hidden md:block">New Folder</span>
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
