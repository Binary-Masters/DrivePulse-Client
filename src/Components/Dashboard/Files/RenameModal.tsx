'use client'
import { useState } from "react";

interface RenameModalProps {
    fullPath: string;
    bucket: string;
    id: string;
    name: string;
    timeCreated: string;
    size: number;
    type: string;
    contentType: string;
    checksum: string;
    owner: any;
    updated: string;
    rootDirectory: string;
    parentPath: string;
}

const RenameModal: React.FC<RenameModalProps> = ({ fullPath, bucket, id, name, timeCreated, size, type, contentType, checksum, owner, updated, rootDirectory, parentPath }) => {
    const closeModal = (e: React.MouseEvent<HTMLButtonElement>) => {
        const modalElement = document.getElementById('my_modal_4');
        if (modalElement) {
            (modalElement as HTMLDialogElement).close();
        }
    };
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
            fullPath,
            bucket,
            id,
            name: renameText,
            timeCreated,
            size,
            type,
            contentType,
            checksum,
            owner,
            updated,
            rootDirectory,
            parentPath,
        }
        console.log(fileMetaData);
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