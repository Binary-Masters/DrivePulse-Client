"use client";
import useStorage from "@/Hooks/useStorage";
import { File } from "lucide-react";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useGetFiles from "@/Hooks/useGetFiles";
import generateChecksum from "@/Utils/Checksum/generateChecksum";
import useAuth from "@/Hooks/useAuth";

const UploadModal: React.FC = () => {
	const [file, setFile] = useState<File | null>(null);
	const { uploadFile, getFileURL, setUploadProgress } = useStorage();
	const axiosPublic = useAxiosPublic();
	const { refetchFiles } = useGetFiles();
	const { user } = useAuth();
	const owner = {
		email: user.email,
		uid: user.uid,
	};

  const closeModal = () => {
    const modalElement = document.getElementById("my_modal_1");
    if (modalElement) {
      (modalElement as HTMLDialogElement).close();
    }
  };

	const handleFileUpload = () => {
		try {
			if (file) {
				// Check database for duplicate files under current user
				// Ensures cloud and server synchronization
				generateChecksum(file).then((checksum) => {
					axiosPublic
						.post("/files/lookup", { checksum, owner })
						.then(({ data }) => {
							if (!data.exists) {
								// Starts an upload session
								const uploadSession = uploadFile(file);
								uploadSession.on(
									"state_changed",
									(snapshot) => {
										const { bytesTransferred, totalBytes } =
											snapshot;
										const currentProgress = Math.round(
											(bytesTransferred / totalBytes) *
												100
										);
										setUploadProgress(currentProgress);
									},
									(err) => {},
									async () => {
										const { snapshot } = uploadSession;
										console.log(snapshot);
										const fileType =
											snapshot.metadata.contentType;
										const filePath =
											snapshot.metadata.fullPath;
										let thumbnail = "";

										// For image thumbnail
										if (fileType.startsWith("image/")) {
											thumbnail = await getFileURL(
												filePath
											);
										}

										// Post file metadata to database
										axiosPublic
											.post("/files", {
												checksum,
												owner,
												thumbnail,
												...snapshot.metadata,
											})
											.then(() => {
												Swal.fire({
													title: "Success",
													text: "File uploaded successfully",
													icon: "success",
													confirmButtonText: "OK",
												});
												refetchFiles();
												setFile(null);
											})
											.catch((err) => console.log(err));
									}
								);
							} else {
								Swal.fire({
									title: "File Already Exists",
									icon: "error",
									confirmButtonText: "OK",
								});
								setFile(null);
							}
						})
						.catch((err) => {
							Swal.fire({
								title: err.message,
								icon: "error",
								confirmButtonText: "OK",
							});
							setFile(null);
						});
				});
			}
		} catch (error) {
			console.log("Couldn't upload file");
		}
	};

	return (
		<div className="mx-3">
			<div className="flex items-center justify-center w-full max-w-3xl mx-auto mt-5">
				<label
					//   style={{
					//     background: "linear-gradient(to top, rgb(231, 233, 239), #ffffff)",
					//   }}
					style={{
						backdropFilter: "blur(150px)",
						boxShadow: "1px 1px 20px #24207b",
					}}
					htmlFor="dropzone-file"
					className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg shadow-lg cursor-pointer "
				>
					<div className="flex flex-col items-center justify-center pt-5 pb-6">
						<svg
							className="w-10 h-10 mb-4 text-primary "
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 20 16"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
							/>
						</svg>
						<p className="mb-2 text-sm text-gray-300 ">
							<span className="font-semibold">
								Click to upload
							</span>{" "}
							or{" "}
							<span className="font-medium text-primary">
								drag
							</span>{" "}
							and{" "}
							<span className="font-medium text-primary">
								drop
							</span>
						</p>
						<p className="text-xs font-medium text-slate-400">
							SVG, PNG, JPG
						</p>
					</div>
					<input
						id="dropzone-file"
						type="file"
						className="hidden"
						onChange={(e) =>
							e.target.files && setFile(e.target.files[0])
						}
					/>
				</label>
			</div>
			{file && (
				<div
					style={{ backdropFilter: "blur(150px)" }}
					className="relative flex items-center justify-between max-w-3xl p-5 mx-auto mt-5 border border-gray-400 shadow-md rounded-md"
				>
					<div className="flex items-center gap-1">
						<File className="text-3xl text-primary" />{" "}
						<h2 className="font-medium text-gray-300">
							{file?.name}
						</h2>
					</div>{" "}
					<h3 className="mr-10 font-medium text-slate-300">
						{file?.type} /{" "}
						{file && (file.size / 1024 / 1024).toFixed(2)} MB
					</h3>
					<button
						onClick={() => setFile(null)}
						className="absolute right-1 top-[14px] btn-sm btn btn-circle text-xl"
					>
						<MdClose />
					</button>
				</div>
			)}
			<div className="flex justify-center mt-4">
				<button
					disabled={!file}
					onClick={() => {
						handleFileUpload();
						closeModal();
					}}
					className="px-6 py-2 text-xl text-center text-white rounded-full bg-primary text hover:bg-blue-600 transition-all duration-300 disabled:bg-gray-300"
				>
					Upload
				</button>
			</div>
		</div>
	);
};

export default UploadModal;
