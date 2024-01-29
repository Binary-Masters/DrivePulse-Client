import Analytics from "./Analytics";
import FileUpladChart from "./FileUpladChart";
import PieChartContent from "./PieChartContent";
import "./styles.css"
const DashboardHome = () => {
    return (
        <div className="min-h-screen main-dashbaord-mesh pt-[85px] px-3 pb-5">
            {/* analytics content */}
                <Analytics/>
            {/* chart content */}
                <PieChartContent/>
           {/* file upload legent chart */}
           <FileUpladChart/>
        </div>
    );
};

export default DashboardHome;