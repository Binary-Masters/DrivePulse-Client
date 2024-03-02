import { FiShare, FiCopy, FiDownload } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import React from "react";
import {
	MdArrowDropDownCircle,
	MdDriveFileRenameOutline,
} from "react-icons/md";
import ShareModal from "./ShareModal";
import RenameModal from "./RenameModal";
import CopyLink from "./Copy";
import Download from "./Download";

interface MoreDropDrownProps {
	fileName: string;
	downloadUrl: string;
	fullPath: string;
	bucket: string;
	id: string;
	name: string;
	refetchFiles: any;
	type?: string;
}

const MoreDropDown: React.FC<MoreDropDrownProps> = ({ fileName, downloadUrl, fullPath, bucket, id, name, refetchFiles, type }) => {
	const [open, setOpen] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	// mouse event to outside click close dropdown
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleOutsideClick);
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, []);

	const openModal = () => {
		const modalElement = document.getElementById("my_modal_2");
		if (modalElement) {
			(modalElement as HTMLDialogElement).showModal();
		} else {
			console.error("Modal element not found");
		}
	};

	const renameModal = () => {
		const modalElement = document.getElementById("my_modal_4");
		if (modalElement) {
			(modalElement as HTMLDialogElement).showModal();
		} else {
			console.error("Modal element not found");
		}
	};

	return (
		<div >
			{
				type !== 'folder' ? <motion.div
					ref={dropdownRef}
					animate={open ? "open" : "closed"}
					className="relative" >
					<button
						onClick={() => setOpen((pv) => !pv)}
						className="flex items-center px-3 py-2 gap-2 rounded-md bg-indigo-50 hover:bg-indigo-100 transition-colors"
					>
						<motion.span variants={iconVariants}>
							<MdArrowDropDownCircle />
						</motion.span>
					</button>

					{/* dropdown */}
					<AnimatePresence>
						{open && (
							<motion.ul
								initial={wrapperVariants.closed}
								variants={wrapperVariants}
								style={{ originY: "top", translateX: "-50%" }}
								className=" z-[1] flex flex-col gap-2 p-2 pr-4 rounded-lg bg-white text-black shadow-xl absolute top-[110%] left-[-5%] w-auto"
							>
								<motion.li
									className="flex items-center w-full p-2 text-xs font-medium cursor-pointer gap-2 whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors"
									onClick={() => setOpen(true)}
								>
									<FiCopy />{" "}
									<CopyLink downloadUrl={downloadUrl} />
								</motion.li>

								<motion.li
									className="flex items-center w-full p-2 text-xs font-medium cursor-pointer gap-2 whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors"
									onClick={openModal}
								>
									<FiShare /> Share
								</motion.li>
								<ShareModal
									fileName={fileName}
									downloadUrl={downloadUrl}
								/>

								<motion.li
									className="flex items-center w-full p-2 text-xs font-medium cursor-pointer gap-2 whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors"
									onClick={() => setOpen(false)}
								>
									<FiDownload /> <Download fileName={fileName} fullPath={fullPath} bucket={bucket} />
								</motion.li>

								<motion.li
									className="flex items-center w-full p-2 text-xs font-medium cursor-pointer gap-2 whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors"
									onClick={renameModal}
								>
									<MdDriveFileRenameOutline /> Rename
								</motion.li>
								<RenameModal
									id={id}
									name={name}
									refetchFiles={refetchFiles}
								/>
							</motion.ul>
						)}
					</AnimatePresence>
				</motion.div> :
					<motion.div
						ref={dropdownRef}
						animate={open ? "open" : "closed"}
						className="relative" >
						<button
							onClick={() => setOpen((pv) => !pv)}
							className="flex items-center px-3 py-2 gap-2 rounded-md bg-indigo-50 hover:bg-indigo-100 transition-colors"
						>
							<motion.span variants={iconVariants}>
								<MdArrowDropDownCircle />
							</motion.span>
						</button>

						{/* dropdown */}
						<AnimatePresence>
							{open && (
								<motion.ul
									initial={wrapperVariants.closed}
									variants={wrapperVariants}
									style={{ originY: "top", translateX: "-50%" }}
									className=" z-[1] flex flex-col gap-2 p-2 pr-4 rounded-lg bg-white text-black shadow-xl absolute top-[110%] left-[-5%] w-auto"
								>
									
									<motion.li
										className="flex items-center w-full p-2 text-xs font-medium cursor-pointer gap-2 whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors"
										onClick={renameModal}
									>
										<MdDriveFileRenameOutline /> Rename
									</motion.li>
									<RenameModal
										id={id}
										name={name}
										refetchFiles={refetchFiles}
									/>
								</motion.ul>
							)}
						</AnimatePresence>
					</motion.div>
			}
		</div>
	);
};

export default MoreDropDown;

const wrapperVariants = {
	open: {
		scaleY: 1,
		transition: {
			when: "beforeChildren",
			staggerChildren: 0.1,
		},
	},
	closed: {
		scaleY: 0,
		transition: {
			when: "afterChildren",
			staggerChildren: 0.1,
		},
	},
};

const iconVariants = {
	open: { rotate: 180 },
	closed: { rotate: 0 },
};
