"use client";
import { FaArrowRight } from "react-icons/fa";
import "./styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
const PieChartContent = () => {
  const value = 0.66;
  const value2 = 0.90;
  return (
    <div className="flex flex-col lg:flex-row items-center gap-3 mt-3">
      <div className="w-full lg:w-[40%] dashboard-home-user h-[250px] rounded-md py-10 pl-5">
        <div className="space-y-1 mb-10">
          <p className="text-blue-400 uppercase font-semibold">Welcome back,</p>
          <h2 className="text-3xl text-slate-200 font-bold">Sadid Hasan</h2>
          <p className="text-gray-300 font-medium">
            Glad to see you again! <br />
            Ask me anything.
          </p>
        </div>
        <button className="text-slate-300 font-semibold cursor-pointer flex items-center gap-1">
          See Profile <FaArrowRight />
        </button>
      </div>
      <div className="w-full lg:w-[30%] progress-background rounded-md h-[250px] shadow-md p-6 relative">
        <div className="w-[180px] absolute left-[30%] md:left-[35%] lg:left-16">
          <CircularProgressbar
            value={value}
            maxValue={1}
            text={`${value * 100}%`}
            strokeWidth={6}
            background={false}
            styles={buildStyles({
                textColor: '#3e98c7',
                trailColor: '#090d2b',
                pathColor: `linear-gradient(90deg, #fff, #090d2b)`
            })}
          />
          ;
        </div>
        <div style={{boxShadow:"1px 1px 30px #24207b"}} className="text-xl font-semibold text-slate-300 bg-[#090d2b]  py-3 px-10 rounded-md absolute bottom-5 left-[20%] md:left-[30%] lg:left-8 shadow-lg">
            <h2  >Total file host 9+</h2>
        </div>
      </div>
      <div className="w-full lg:w-[30%] progress-background rounded-md h-[250px] shadow-md p-6 relative">
      <div className="w-[180px] absolute left-[30%] md:left-[35%] lg:left-16">
          <CircularProgressbar
            value={value2}
            maxValue={1}
            text={`${value2 * 100}%`}
            strokeWidth={6}
            background={false}
            styles={buildStyles({
                textColor: '#3e98c7',
                trailColor: '#090d2b',
                pathColor: `#05ca98`
            })}
          />
          
        </div>
        <div style={{boxShadow:"1px 1px 30px #24207b"}} className="text-xl font-semibold text-slate-300 bg-[#090d2b] py-3 px-2 rounded-md absolute bottom-5 left-[20%] md:left-[30%] lg:left-8 shadow-lg">
            <h2  >Your account performance</h2>
        </div>
      </div>
    </div>
  );
};

export default PieChartContent;
