"use client"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import "./styles.css";
const FileUpladChart = () => {
    const data = [
        {
          name: 'Sun',
          FileHosting: 10,
          Performance: 90,
        },
        {
          name: 'Mon',
          FileHosting: 0,
          Performance: 50,
        },
        {
          name: 'Tue',
          FileHosting: 5,
          Performance: 80,
        },
        {
          name: 'Wed',
          FileHosting: 2,
          Performance: 94,
        },
        {
          name: 'Thu',
          FileHosting: 12,
          Performance: 98,
        },
        {
          name: 'Fri',
          FileHosting: 0,
          Performance: 90,
        },
        {
          name: 'Sat',
          FileHosting: 20,
          Performance: 100,
        },
      ];
      
    return (
        <div className="flex flex-col md:flex-row gap-3 pt-3">
    <div className="w-full md:w-[60%] h-[300px] chart-bg p-5 rounded-md">
        <h2 className='text-slate-300 font-medium mb-5'>Weekly file hosting history:</h2>
    <ResponsiveContainer width="100%" height="80%">
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 10,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" color="#fff"/>
          <YAxis />
          <Tooltip />
          {/* <Area type="monotone" dataKey="uv" stackId="1" stroke="#8884d8" fill="#8884d8" /> */}
          <Area type="monotone" dataKey="FileHosting" stackId="1" strokeWidth={3} stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="Performance" stackId="1" strokeWidth={3} stroke="#0b8eff" fill="#0b8eff" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    <div className="md:w-[40%] h-[300px] chart-bg p-6 rounded-md">
        <h3 className='text-2xl text-slate-300 font-semibold'>Next event comming soon...</h3>
        <p className='text-slate-400 font-medium'>At 10,February 2024</p>
    </div>
    </div>
    );
};

export default FileUpladChart;