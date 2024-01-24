"use client"
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useBenifites = () => {
 const axiosPublic=useAxiosPublic()
 const {data:benifites=[],isLoading:loading,refetch}=useQuery({
  queryKey:['benifites'],
  queryFn:async()=>{
   const res=await axiosPublic('/benifites')
   return res.data
  }
 })
return [benifites,loading,refetch]
};

export default useBenifites;