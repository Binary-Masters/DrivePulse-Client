import DashboardNav from "@/Components/Shared/DashboardNav/DashboardNav";
import SideNave from "@/Components/SideNave/SideNave";
import React from "react";
import PrivateRoute from "@/Components/Routes/PrivateRoute";

const layout = ({ children }) => {
	return (
		<PrivateRoute>
			<div>
				<div className="fixed inset-y-0 z-50 flex-col hidden h-full md:flex md:w-64">
					<SideNave />
				</div>
				<div className="md:ml-64">
					<DashboardNav />
					{children}
				</div>
			</div>
		</PrivateRoute>
	);
};

export default layout;
