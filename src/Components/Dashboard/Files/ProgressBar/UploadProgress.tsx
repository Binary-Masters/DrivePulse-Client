"use client"

import {useState} from "react";

export default function UploadProgress() {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return <div className="absolute bottom-0 w-[calc(100%-5vw)] bg-white rounded-t-lg -translate-x-1/2 left-1/2 h-12">
	</div>
}
