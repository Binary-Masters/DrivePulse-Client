import { BsFiletypeTxt } from "react-icons/bs";
import { FaFolder, FaImage, FaFilePdf } from "react-icons/fa";
import { FaDebian } from "react-icons/fa6";

const icons = [
	{
		contentType: "folder",
		icon: FaFolder,
	},
	{
		contentType: "application/pdf",
		icon: FaFilePdf,
	},
	{
		contentType: "image/jpeg",
		icon: FaImage,
	},
	{
		contentType: "image/png",
		icon: FaImage,
	},
	{
		contentType: "text/plain",
		icon: BsFiletypeTxt,
	},
	{
		contentType: "application/vnd.debian.binary-package",
		icon: FaDebian,
	},
]

export default icons;
