// "use client";
import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://drive-pulse-server.vercel.app",
});

// http://localhost:2727
// https://drive-pulse-server.vercel.app/pricing

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
