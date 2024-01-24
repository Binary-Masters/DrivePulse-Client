import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "http://localhost:2727",
});

// http://localhost:2727

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
