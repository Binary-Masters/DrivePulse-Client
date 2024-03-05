// "use client";
import axios from "axios";

const axiosPublic = axios.create({
	baseURL: "http://localhost:3001",
});

// http://localhost:3001
// https://drive-pulse-server.vercel.app
// https://drivepulse-server.onrender.com

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
