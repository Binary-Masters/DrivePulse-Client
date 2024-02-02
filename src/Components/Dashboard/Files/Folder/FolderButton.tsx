import { useState } from "react";
import FolderModal from "./FolderModal";
import { FaFolderPlus } from "react-icons/fa";

const FolderButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleCreateFolder = (data: { folderName: string }) => {
        //if needed to used logic here for backend
        console.log(`Creating folder: ${data.folderName}`);
        closeModal();
    };

    return (
        <>
            <button className="text-[16px]  border-0 btn bg-primary text-white hover:bg-blue-600 transition-all duration-300" onClick={openModal}><FaFolderPlus/> New Folder</button>
            <FolderModal isOpen={isModalOpen} onRequestClose={closeModal} onSubmit={handleCreateFolder} />
        </>
    );
};

export default FolderButton;