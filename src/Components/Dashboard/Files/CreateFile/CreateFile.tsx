import React from 'react';
import { IoCreateOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import useAxiosPublic from '@/Hooks/useAxiosPublic';
import useGetFiles from '@/Hooks/useGetFiles';
import useAuth from '@/Hooks/useAuth';
import Swal from 'sweetalert2';
import useStorage from '@/Hooks/useStorage';
import toast from 'react-hot-toast';

type FormData = {
    fileName: string;
};

const CreateFile = () => {
    const axiosPublic = useAxiosPublic();
    const { refetchFiles, filesData } = useGetFiles();
    const { user } = useAuth();
    const {path} = useStorage()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const onSubmit = async (data: { fileName: string }) => {
        const name = data.fileName;
        const isTxtFile = name.toLowerCase().endsWith('.txt');

       
        if(isTxtFile){
            const folderMetadata = {
                checksum: '',
                type: 'file',
                owner: { uid: user?.uid, email: user?.email,  store: "Local" },
                contentType: 'text/plain',
                bucket: process.env.NEXT_PUBLIC_STORAGEBUCKET,
                fullPath: `${user.uid + path + name}`,
                name: data.fileName,
                size: 0,
            };
            
            try {
                await axiosPublic.post('/files', folderMetadata);
                toast.success('Created text file', {
                    position: 'top-center',
                })
                closeModal();
                refetchFiles();
            } catch (err) {
                closeModal()
                Swal.fire({
                    position: "top",
                    icon: "warning",
                    title: `${data.fileName} give error-- ${err}`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        }else{
            closeModal()
            toast.error(`${data.fileName} is not txt file`, {
                position: 'top-center',
                duration: 3000
            })
        }
        
      
    };

    const openModal = () => {
        const modalElement = document.getElementById('my_modal_7');
        if (modalElement) {
            (modalElement as HTMLDialogElement).showModal();
        } else {
            console.error('Modal element not found');
        }
    };

    const closeModal = () => {
        const modalElement = document.getElementById('my_modal_7');
        if (modalElement) {
            (modalElement as HTMLDialogElement).close();
            reset(); // Reset form on modal close
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit(onSubmit)();
        }
    };

    return (
        <div>
            <button
                onClick={openModal}
                className="text-xs md:text-[16px] border-0 btn bg-primary text-white hover:bg-blue-600 transition-all duration-300"
            >
                <IoCreateOutline className="text-xl " />
                <span className="hidden md:block">Create File</span>
            </button>

            <dialog id="my_modal_7" className="modal text-black max-w-sm mx-auto">
                <div className="modal-box bg-gradient-to-br from-[#0c2e52df] to-[#051c34] shadow shadow-sky-600">
                    <form method="dialog">
                        <button
                            className="btn btn-sm btn-circle text-white btn-ghost absolute right-2 top-2"
                            onClick={closeModal}
                        >
                            ✕
                        </button>
                    </form>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)} className="z-10 space-y-2 ">
                            <label className="label">
                                <span className="text-xl font-medium label-text text-white">File Name</span>
                            </label>
                            <input
                                placeholder="exp: index.txt"
                                className="inline-block w-full input input-bordered "
                                type="text"
                                {...register('fileName', { required: true })}
                                onKeyPress={handleKeyPress}
                            />
                            {errors.fileName && (
                                <span className="text-sm text-red-400">This field is required</span>
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
                </div>
            </dialog>
        </div>
    );
};

export default CreateFile;
