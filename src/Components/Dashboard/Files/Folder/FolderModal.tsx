import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

interface FolderModalProps {
	isOpen: boolean;
	onRequestClose: () => void;
	onSubmit: (data: { folderName: string }) => void;
}
type FormData = {
	folderName: string;
};

//   style modal
const customStyles = {
	content: {
		top: "40%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		zIndex: 999,
		transform: "translate(-50%, -50%)",
		background: "linear-gradient(to right, #0c2e52df, #051c34)",
	},
};

const FolderModal: React.FC<FolderModalProps> = ({
	isOpen,
	onRequestClose,
	onSubmit,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const handleFormSubmit = (data: { folderName: string }) => {
		onSubmit(data);
	};

	// key press features

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === "Enter") {
			handleSubmit(handleFormSubmit)();
		}
	};

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			style={customStyles}
		>
			<form
				onSubmit={handleSubmit(handleFormSubmit)}
				className="z-10 space-y-2 "
			>
				<label className="label">
					<span className="text-xl font-medium label-text text-white">
						Folder Name
					</span>
				</label>
				<input
					placeholder="Enter Folder Name"
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
						onClick={() => onRequestClose()}
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
		</Modal>
	);
};

export default FolderModal;
