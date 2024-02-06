// "use client";
import axios from "axios";

const axiosPublic = axios.create({
	baseURL: "http://drive-pulse-server.vercel.app",
});

// http://localhost:3001
// https://drive-pulse-server.vercel.app

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
