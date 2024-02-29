import DashboardNav from "@/Components/Shared/DashboardNav/DashboardNav";
import SideNave from "@/Components/SideNave/SideNave";
import React from "react";
import PrivateRoute from "@/Components/Routes/PrivateRoute";
import FilesProvider from "@/providers/FilesProvider";
import UploadProgress from "@/Components/Dashboard/Files/ProgressBar/UploadProgress";

const layout = ({ children }) => {
	return (
		<PrivateRoute>
			<div>
				<div className="inset-y-0 flex-col hidden md:flex">
					<SideNave />
				</div>
				<div className="relative md:ml-64">
					<FilesProvider>
						<DashboardNav />
						{children}
						<UploadProgress/>
					</FilesProvider>
				</div>
			</div>
		</PrivateRoute>
	);
};

export default layout;
