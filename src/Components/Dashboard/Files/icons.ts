import { FaFolder, FaImage, FaFilePdf, FaFileAlt } from "react-icons/fa";
import { FaDebian, FaFileVideo } from "react-icons/fa6";

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
		contentType: "application/vnd.debian.binary-package",
		icon: FaDebian,
	},
	{
		contentType: "text/plain",
		icon: FaFileAlt,
	},
	{
		contentType: "video/mp4",
		icon: FaFileVideo,
	}
]

export default icons;
