'use client'
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { useState } from "react";

interface RenameModalProps {
    id: string;
    name: string;
}

const RenameModal: React.FC<RenameModalProps> = ({ id, name }) => {
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
    const handleFileRename = () => {
        const fileMetaData = {
            id,
            name: renameText,
        }
        // console.log(fileMetaData);
        axiosPublic.patch('/rename-file', fileMetaData)
            .then(res => {
                console.log(res);
            })
    }

    return (
        <dialog id="my_modal_4" className="modal max-w-xs mx-auto">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={closeModal}>
                        ✕
                    </button>
                </form>
                <h3 className="font-bold text-black text-lg mb-5">Rename</h3>
                <form>
                    <div className="form-control">
                        <input onChange={handleRenameText} type="text" placeholder="Type here" className="input input-bordered w-full" />
                    </div>

                </form>
                <div className="form-control mt-6 flex flex-row right-2 gap-2 ">
                    <button onClick={closeModal} className="btn">cancel</button>
                    <button onClick={handleFileRename} className="btn">ok</button>
                </div>

            </div>
        </dialog>
    );
};

export default RenameModal;