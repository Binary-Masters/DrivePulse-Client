import Swal from "sweetalert2";
import deleteFileFunc from "./fragments/deleteFileFunc";
import deleteFolderFunc from "./fragments/deleteFolderFunc";

const handleDeleteFile = (
	hookPropObj: any,
	fullPath: string,
	type: string = "file"
) => {
	const filePath = fullPath.split("/");
	const myPath = filePath[filePath.length - 1];

	Swal.fire({
		title: "Are you sure?",
		text: `You want to delete ${type} ${myPath} `,
		icon: "warning",
		showCancelButton: true,
		confirmButtonColor: "#3085d6",
		cancelButtonColor: "#d33",
		confirmButtonText: "Yes, delete it!",
	}).then((result) => {
		if (result.isConfirmed) {
			type === "file" && deleteFileFunc(hookPropObj, fullPath);
			type === "folder" && deleteFolderFunc(hookPropObj, fullPath);
		}
	});
};

export default handleDeleteFile;
