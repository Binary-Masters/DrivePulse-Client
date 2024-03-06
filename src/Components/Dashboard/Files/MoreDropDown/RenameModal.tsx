'use client'
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useState } from "react";
import Swal from "sweetalert2";

interface RenameModalProps {
    id: string;
    name: string;
    refetchFiles: any;
}

const RenameModal: React.FC<RenameModalProps> = ({ id, name, refetchFiles }) => {
    const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        const modalElement = document.getElementById('my_modal_4');
        if (modalElement) {
            (modalElement as HTMLDialogElement).close();
        }
    };
    const axiosPublic = useAxiosPublic();
    const [renameText, setRenameText] = useState(name);
    // getting rename field text
    const handleRenameText = (e) => {
        e.preventDefault();
        setRenameText(e.target.value);
    }
    // console.log(renameText);
    // console.log(owner);

    // File Rename
    const handleFileRename = (e) => {
        e.preventDefault();
        const fileMetaData = {
            id,
            name: renameText,
        }
        // console.log(fileMetaData);
        axiosPublic.patch('/rename-file', fileMetaData)
            .then(res => {
                console.log(res);
                Swal.fire({
                    // title: "Congratulations!",
                    text: "File Renamed successfully",
                    icon: "success",
                    confirmButtonText: "OK",
                })
                refetchFiles();
                const modalElement = document.getElementById('my_modal_4');
                if (modalElement) {
                    (modalElement as HTMLDialogElement).close();
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleFileRename(event);
        }
    };

    return (
        <dialog id="my_modal_4" className="modal max-w-sm mx-auto ">
            <div className="modal-box bg-gradient-to-br from-[#0c2e52df] to-[#051c34] shadow shadow-sky-600">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-white text-lg mb-5 text-left">Rename</h3>
                <form>
                    <div className="form-control">
                        <input onChange={handleRenameText} onKeyPress={handleKeyPress} type="text" placeholder="Rename file with .extension" className="input input-bordered w-full" />
                    </div>

                </form>
                <div className="form-control mt-6 flex flex-row justify-end right-2 gap-3 ">
                    <button
                        onClick={closeModal}
                        className="px-3 mt-5 text-sm font-medium text-white hover:text-blue-600 bg-[#051c34] border-2 border-sky-500 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-200 rounded-3xl">cancel
                    </button>
                    <button
                        onClick={handleFileRename}
                        className="px-3 py-2 mt-5 text-sm font-medium text-center text-white bg-gradient-to-br from-sky-500 to-blue-600 hover:bg-gradient-to-bl rounded-3xl focus:ring-4 focus:outline-none focus:ring-blue-300">confirm
                    </button>
                </div>

            </div>
        </dialog>
    );
};

export default RenameModal;