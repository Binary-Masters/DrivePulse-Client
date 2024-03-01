import DashboardHome from "@/Components/Dashboard/DashboardHome/DashboardHome";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
	return (
		<div>
			<DashboardHome />
            <Toaster/>
		</div>
	);
};

export default Dashboard;

