// "use client";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

// interface pricingsData {
//   id: string;
//   benifit1: string;
//   benifit2: string;
//   benifit3: string;
//   benifit4: string;
//   price: number;
//   recommended: string;
//   btnColor: string;
//   badg: string;
// }
const usePricings = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: pricings = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["pricings"],
    queryFn: async () => {
      const res = await axiosPublic("/pricing");
      return res.data;
    },
  });
  return [pricings, loading, refetch];
};

export default usePricings;
