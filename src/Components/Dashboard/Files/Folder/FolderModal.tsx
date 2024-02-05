import React from 'react';
import { useForm } from 'react-hook-form';
import Modal from 'react-modal';

interface FolderModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onSubmit: (data: { folderName: string }) => void;
}
type FormData = {
    folderName: string
}

//   style modal
const customStyles = {
    content: {
        top: '40%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        zIndex: 999,
        transform: 'translate(-50%, -50%)',
        background: 'linear-gradient(to right, #eaeff3, #f6f8fa)',
    },
};

const FolderModal: React.FC<FolderModalProps> = ({ isOpen, onRequestClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>()

    const handleFormSubmit = (data: { folderName: string }) => {
        onSubmit(data)
    }
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            style={customStyles}

        >
            <form onSubmit={handleSubmit(handleFormSubmit)} className='z-10 space-y-2 '>
                <label className="label">
                    <span className="label-text text-xl font-medium">Folder Name</span>
                </label>
                <input placeholder='Enter Folder Name' className="input input-bordered w-full inline-block " type="text" {...register("folderName", { required: true })} />
                {errors.folderName && <span className='text-red-400 text-sm'>This field is required</span>}

                <div className='flex gap-5 justify-end'>
                    <button onClick={()=>onRequestClose()} className=' text-blue-600 bg-white border border-sky-500 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-gray-200 font-medium rounded-3xl text-sm px-3 mt-5'>Cancel</button>
                    <button className='text-white bg-gradient-to-br from-sky-500 to-blue-600 hover:bg-gradient-to-bl rounded-3xl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-3 py-2 text-center mt-5' type="submit">Confirm</button>
                </div>
            </form>
        </Modal>
    );
};

export default FolderModal;