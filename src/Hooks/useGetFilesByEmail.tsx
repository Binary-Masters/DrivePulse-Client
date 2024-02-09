import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useStorage from "./useStorage";
import useAuth from "./useAuth";

const useGetFilesByEmail = () => {
  const axiosPublic = useAxiosPublic();
  const { path } = useStorage();
  const { user } = useAuth();
  const {
    data: filesData = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      const res = await axiosPublic(
        `/files?rootdir=${user?.email}&path=${path}`
      );
      return res.data;
    },
  });
  return [filesData, loading, refetch];
};

export default useGetFilesByEmail;
