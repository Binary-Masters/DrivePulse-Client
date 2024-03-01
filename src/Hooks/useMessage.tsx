import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const useMessageData = (chatId) => {
  const axiosPublic = useAxiosPublic();

  const { data, refetch } = useQuery({
    queryKey: ["messageData", chatId],
    queryFn: async () => {
      try {
        const response = await axiosPublic.get(`/message/${chatId}`);
        return response.data;
      } catch (error) {
        throw new Error("Failed to fetch messages");
      }
    },
  });

  return { messages: data, refetch };
};

export default useMessageData;
