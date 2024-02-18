"use client"
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useGetfiles = (search) => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();

    console.log(user);
    console.log(search);
    // datatype default empty object 
    const {
      data: userData ={},
      isLoading: loadings,
      refetch,
    } = useQuery({
      queryKey: ['searchfiles',user?.uid],
      queryFn: async () => {
        const res = await axiosPublic.get(
            `/get-search-files?searchText=${search}&&userId=${user?.uid}`
          );;
        return res.data;
      },
    });

   
    
      
       console.log(userData)
    return [userData, loadings, refetch];
  ;
}
// call hook in  filesearch
export default useGetfiles
