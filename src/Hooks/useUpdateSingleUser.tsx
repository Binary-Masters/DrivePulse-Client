import useAxiosPublic from "./useAxiosPublic";

const useUpdateSingleUser = () => {
    const axiosPublic = useAxiosPublic();
    return (userInfo)=>axiosPublic.put('/user',userInfo);
};

export default useUpdateSingleUser;