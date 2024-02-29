import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import useGetSingleUser from './useGetSingleUser';

const useChats = () => {
    const axiosPublic = useAxiosPublic()
    const [userData] = useGetSingleUser();
    const { data: chats =[], refetch} = useQuery({
        queryKey: ["chatsData", userData?._id],
        queryFn: () => axiosPublic.get(`/chat/${userData?._id}`).then((response) => response.data),
      });

      return [chats, refetch]
};

export default useChats;