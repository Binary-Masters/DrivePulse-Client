// import Analytics from "./Analytics";
import Analytics from "@/app/analytics/page";
import FileUpladChart from "./FileUpladChart";
import PieChartContent from "./PieChartContent";
import "./styles.css"
const DashboardHome = () => {
    return (
        <div className="min-h-screen gradient1-bg pt-[85px] px-3 pb-5">
            {/* analytics content */}
                {/* <Analytics/> */}
                <Analytics/>
            {/* chart content */}
                <PieChartContent/>
           {/* file upload legent chart */}
           <FileUpladChart/>
        </div>
    );
};

export default DashboardHome;