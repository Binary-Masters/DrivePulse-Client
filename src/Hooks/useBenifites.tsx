// "use client";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
interface benifitesData {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const useBenifites = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: benefits = [],
    isLoading: loading,
    refetch,
  } = useQuery<benifitesData[]>({
    queryKey: ["benifites"],
    queryFn: async () => {
      const res = await axiosPublic("/benifites");
      return res.data;
    },
  });
  return [benefits, loading, refetch];
};

export default useBenifites;
