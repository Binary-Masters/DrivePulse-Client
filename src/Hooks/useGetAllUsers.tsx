import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetAllUsers = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: users = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosPublic("/all-users");
      return res.data;
    },
  });
  return [users, loading, refetch];
};

export default useGetAllUsers;