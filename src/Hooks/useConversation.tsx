// "use client";
import useAxiosPublic from "./useAxiosPublic";
import { useQuery } from "@tanstack/react-query";


const useConversation = ({userId}) => {
  const axiosPublic = useAxiosPublic();
  const {
    data: conversation,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["conversation"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/single-user/${userId}`);
      console.log(res.data);
      return res.data;
    },
  });
  return [conversation, loading, refetch];
};

export default useConversation;
