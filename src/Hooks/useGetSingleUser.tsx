"use client"
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useGetSingleUser = () => {
    // http://localhost:3001/users?email=mnmorshadmondol@gmail.com
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    console.log(user);
    // datatype default empty object 
    const {
      data: userData ={},
      isLoading: loading,
      refetch,
    } = useQuery({
      queryKey: ['user',user?.email],
      queryFn: async () => {
        const res = await axiosPublic.get(`/single-user?email=${user.email}`);
        return res.data;
      },
    });
    console.log(userData);
    return [userData, loading, refetch];
  ;
}
// call hook in  ProfileCard and Edit.tsx
export default useGetSingleUser
