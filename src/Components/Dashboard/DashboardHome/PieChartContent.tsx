"use client";
import { FaArrowRight } from "react-icons/fa";
import "./styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import useGetSingleUser from "@/Hooks/useGetSingleUser";
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import Link from "next/link";
import useGetFiles from "@/Hooks/useGetFiles";
import useAuth from "@/Hooks/useAuth";
const PieChartContent = () => {
  const [userData] = useGetSingleUser();
  const {user} = useAuth()
  const { filesData } = useGetFiles();
  console.log(filesData);
  const value = filesData?.length;
  const value2 = 100 - filesData?.length;

  const data = [
    { name: "Total Storage", value: 5000 },
    { name: "Used Storage", value: 1000 }
  ];

  const COLORS = ["#0088FE", "#00C49F"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row items-center gap-3 mt-3">
      <div className="w-full lg:w-[40%] dashboard-home-user h-[250px] rounded-md py-10 pl-5">
        <div className="space-y-1 mb-10">
          <p className="text-blue-400 uppercase font-semibold">Welcome back,</p>
          <h2 className="text-3xl text-slate-200 font-bold">{user?.displayName}</h2>
          <p className="text-gray-300 font-medium">
            Share your file <br />
            And make your day.
          </p>
        </div>
        <Link href={"/dashboard/profile"}>
        <button className="text-slate-300 font-semibold cursor-pointer flex items-center gap-1">
          See Profile <FaArrowRight />
        </button></Link>
      </div>
      <div className="w-full lg:w-[30%] progress-background rounded-md h-[250px] shadow-md p-6 relative">
        <div className=" flex justify-center">
          <div className="w-[180px]">
            <CircularProgressbar
              value={value}
              maxValue={100}
              text={`${value}%`}
              strokeWidth={6}
              background={false}
              styles={buildStyles({
                textColor: "#3e98c7",
                trailColor: "#090d2b",
                pathColor: `linear-gradient(90deg, #fff, #090d2b)`,
              })}
            />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div
            style={{ boxShadow: "1px 1px 30px #24207b" }}
            className="text-xl w-[90%] font-semibold text-slate-300 bg-[#090d2b]  py-3 px-10 rounded-md  shadow-lg absolute bottom-3">
            <h2 className="text-center">Total file host {filesData?.length}</h2>
          </div>
        </div>
      </div>
      {/* admin and user dynamic pie chart */}
      {userData?.type === "admin" ? (
         <div className="w-full lg:w-[30%] progress-background rounded-md h-[250px] shadow-md p-6 relative">
         <div className=" flex justify-center">
           <div className="">
           <PieChart width={200} height={200}>
            
            <Tooltip/>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          
          >
            
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
           </div>
         </div>
         <div style={{ boxShadow: "1px 1px 30px #24207b" }} className="flex justify-center bg-[#090d2b] rounded-md  p-2 left-1  absolute bottom-1 w-[98%]">
          <div>
          <h2  
             className="text-sm font-medium text-slate-300">
             Total Storage: 5 GB / <span className="text-[#0088FE] font-semibold
             ">83%</span>
           </h2>
           <h2  
             className="text-sm font-medium text-slate-300">
             Used Storage: 1 GB / <span className="text-[#00C49F] font-semibold">17%</span>
           </h2>
          </div>
         </div>
       </div>
      ) : (
        <div className="w-full lg:w-[30%] progress-background rounded-md h-[250px] shadow-md p-6 relative">
          <div className=" flex justify-center">
            <div className="w-[180px]">
              <CircularProgressbar
                value={value2}
                maxValue={100}
                text={`${value2}%`}
                strokeWidth={6}
                background={false}
                styles={buildStyles({
                  textColor: "#3e98c7",
                  trailColor: "#090d2b",
                  pathColor: `#05ca98`,
                })}
              />
            </div>
          </div>
          <div className="flex justify-center">
            <h2
              style={{ boxShadow: "1px 1px 30px #24207b" }}
              className="text-xl w-[90%] font-semibold text-slate-300 bg-[#090d2b] py-3 px-2 rounded-md absolute bottom-5  shadow-lg">
              Your account performance
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default PieChartContent;
