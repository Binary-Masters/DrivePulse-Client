import Link from 'next/link';
import React from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { useForm } from "react-hook-form";

interface FolderModalProps {
	onSubmit: (data: { folderName: string }) => void;
}
type FormData = {
	folderName: string;
};

const CreateFile: React.FC<FolderModalProps> = ({onSubmit}) => {

    // react hook form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    const handleFormSubmit = (data: { folderName: string }) => {
        onSubmit(data);
    };

    // modal open and close
    const openModal = () => {
        const modalElement = document.getElementById('my_modal_7');
        if (modalElement) {
            (modalElement as HTMLDialogElement).showModal();
        } else {
            console.error('Modal element not found');
        }
    }
    const closeModal = () => {
        const modalElement = document.getElementById('my_modal_7');
        if (modalElement) {
            (modalElement as HTMLDialogElement).close();
        }
    };

    // key press features

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSubmit(handleFormSubmit)();
        }
    };

    return (
        <div>
            <button onClick={openModal}
                className="text-xs md:text-[16px]  border-0 btn bg-primary text-white hover:bg-blue-600 transition-all duration-300"
            >
                <IoCreateOutline className="text-xl " />
                <span className="hidden md:block">Create File</span>
            </button>

            {/* Modal */}
            <dialog id="my_modal_7" className="modal text-black max-w-sm mx-auto">
                <div className="modal-box bg-gradient-to-br from-[#0c2e52df] to-[#051c34] shadow shadow-sky-600">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle text-white btn-ghost absolute right-2 top-2" onClick={closeModal}>
                            ✕
                        </button>
                    </form>
                    <div>
                        <form
                            onSubmit={handleSubmit(handleFormSubmit)}
                            className="z-10 space-y-2 "
                        >
                            <label className="label">
                                <span className="text-xl font-medium label-text text-white">
                                    File Name
                                </span>
                            </label>
                            <input
                                placeholder="exp: index.html"
                                className="inline-block w-full input input-bordered "
                                type="text"
                                {...register("folderName", { required: true })}
                                onKeyPress={handleKeyPress}
                            />
                            {errors.folderName && (
                                <span className="text-sm text-red-400">
                                    This field is required
                                </span>
                            )}

                            <div className="flex justify-end gap-5">
                                <button
                                    onClick={closeModal}
                                    className="px-3 mt-5 text-sm font-medium text-white hover:text-blue-600 bg-[#051c34] border-2 border-sky-500 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-200 rounded-3xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-3 py-2 mt-5 text-sm font-medium text-center text-white bg-gradient-to-br from-sky-500 to-blue-600 hover:bg-gradient-to-bl rounded-3xl focus:ring-4 focus:outline-none focus:ring-blue-300"
                                    type="submit"
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>

                    </div>

                <Link  href={"/dashboard/create-file"}>go to file</Link>
                </div>
            </dialog>
        </div>
    );
};

export default CreateFile;