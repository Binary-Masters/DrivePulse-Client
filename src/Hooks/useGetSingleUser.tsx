// import { useQuery } from 'react-query';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useGetSingleUser = () => {
  const axiosPublic = useAxiosPublic();
  const {user:CurrentUser} = useAuth();
  const {
    data: user = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["single-user"],
    queryFn: async () => {
      const res = await axiosPublic("/single-user",CurrentUser.email);
      return res.data;
    },
  });
  return [user, loading, refetch];
};

export default useGetSingleUser;