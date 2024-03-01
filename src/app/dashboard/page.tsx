import DashboardHome from '@/Components/Dashboard/DashboardHome/DashboardHome';
import FilesProvider from '@/providers/FilesProvider';
import { Toaster } from 'react-hot-toast';


const Dashboard = () => {
    return (
        <>
        <FilesProvider>
            <Toaster/>
        <DashboardHome/>
        </FilesProvider>
        </>
    );
};

export default Dashboard;