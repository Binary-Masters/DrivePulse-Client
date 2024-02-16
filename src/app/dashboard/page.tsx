import DashboardHome from '@/Components/Dashboard/DashboardHome/DashboardHome';
import FilesProvider from '@/providers/FilesProvider';


const Dashboard = () => {
    return (
        <>
        <FilesProvider>
        <DashboardHome/>
        </FilesProvider>
        </>
    );
};

export default Dashboard;