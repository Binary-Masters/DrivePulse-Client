"use client";

import useStorage from "@/Hooks/useStorage";
import { useEffect, useState } from "react";
import { Circle } from "rc-progress";
import { BsUpload } from "react-icons/bs";

export default function UploadProgress() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [compHeight, setCompHeight] = useState<number>(0);
	const { uploadProgress, uploadFileInfo } = useStorage();
	const strokeColorCode = "#FFF";
	useEffect(() => {
		uploadFileInfo ? setIsOpen(true) : setIsOpen(false);
		const component = document.getElementById("progress");
		isOpen ? setCompHeight(0) : setCompHeight(component?.scrollHeight || 0);
	}, [isOpen, uploadFileInfo]);

	return (
			<div
				id="progress"
				style={{ bottom: 0 - compHeight }}
				className="absolute text-lg md:text-xl flex transition-all text-white items-center justify-center md:justify-between px-4 w-[calc(100%-5vw)] bg-gradient-1 rounded-t-lg -translate-x-1/2 left-1/2 h-12"
			>
				<div className="flex items-center gap-5">
					<p className="hidden md:block">File: {uploadFileInfo?.name}</p>
					<p className="hidden lg:block">
						Size:{" "}
						{(uploadFileInfo?.size / (1024 * 1024)).toPrecision(2)}{" "}
						MB
					</p>
					<p className="hidden xl:block">Status: {uploadFileInfo?.status}</p>
				</div>
				<div className="flex items-center gap-2">
					<p>
						Progress:{" "}
						<span className="font-bold text-white">
							{uploadProgress}%
						</span>
					</p>
					<div className="relative">
						<Circle
							percent={uploadProgress}
							className="w-10 h-10"
							strokeWidth={6}
							strokeColor={strokeColorCode}
							trailColor={strokeColorCode}
						/>
						<BsUpload className="absolute text-xl left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
					</div>
				</div>
			</div>
	);
}
