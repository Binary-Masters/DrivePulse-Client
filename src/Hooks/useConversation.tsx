// import useAxiosPublic from "./useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
// import useGetSingleUser from "./useGetSingleUser";

// const useConversation = () => {
//   const axiosPublic = useAxiosPublic();
//   const [userData] = useGetSingleUser();

//   const {
//     data: conversations = [],
//     isLoading,
//     isError,
//   } = useQuery({
//     queryKey: ["conversation", userData?._id], // Include users._id in the dependency array
//     queryFn: async () => {
//       const res = await axiosPublic.get(`/conversation/` + userData?._id);
//       return res.data;
//     },
//   });
//   // console.log(conversations);
//   return { conversations, isLoading, isError };
// };

// export default useConversation;
