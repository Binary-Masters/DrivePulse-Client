import UploadForm from "@/Components/UploadForm/UploadForm";
import React from "react";

const UploadFile = () => {
	return (
		<div className="min-h-screen pt-[85px] gradient1-bg">
			<h3 className="text-2xl font-medium text-center text-slate-300">
				<span className="text-primary">Upload </span>your{" "}
				<span className="text-primary">file</span> and share it !
			</h3>
			<UploadForm />
		</div>
	);
};

export default UploadFile;

