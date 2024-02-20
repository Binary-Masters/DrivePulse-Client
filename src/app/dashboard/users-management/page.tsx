'use client'
import LoadingAnimation from "@/Components/Animation/LoadingAnimation/LoadingAnimation";
import useGetAllUsers from "@/Hooks/useGetAllUsers";
import useUpdateSingleUser from "@/Hooks/useUpdateSingleUser";
import Image from "next/image";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import userIcon from '../../../assests/images/blank-head-profile-pic-for-a-man.jpg'
import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { error } from "console";


const UsersManagement = () => {
    const [users, loading, refetch] = useGetAllUsers(); //load user from mongodb
    // console.log(users);
    const router = useRouter();
    const updateUser = useUpdateSingleUser();
    const { deleteAnyUser, user: currentUser } = useAuth();
    console.log(currentUser);
    const axiosPublic = useAxiosPublic();


    if (loading) {
        return <LoadingAnimation />
    }

    const makeAdmin = (user) => {
        console.log(user);
        const userInfo = {
            email: user?.email,
            name: user.name,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            uid: user.uid,
            type: 'admin',
        }
        updateUser(userInfo)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire({
                        title: "Congratulations!",
                        text: "User is now an Admin",
                        icon: "success",
                        confirmButtonText: "OK",
                    })
                    refetch();
                }
            })
    }
    const makeUser = (user) => {
        const userInfo = {
            email: user?.email,
            name: user.name,
            emailVerified: user.emailVerified,
            phoneNumber: user.phoneNumber,
            photoURL: user.photoURL,
            uid: user.uid,
            type: 'user',
        }
        updateUser(userInfo)
            .then(res => {
                if (res.status === 200) {
                    Swal.fire({
                        title: "Congratulations!",
                        text: "Admin is now an user",
                        icon: "success",
                        confirmButtonText: "OK",
                    })
                    refetch();
                    if (userInfo.email === currentUser.email) {
                        router.push("/dashboard");
                    }
                }
            })
    }

    // delete user
    const handleDeleteUser = (userID) => {
        // console.log(userId);
        const uid = {
            data: {
                userId: userID
            }
        }
        console.log(uid);

        Swal.fire({
            title: "Are you sure?",
            text: `You Want To Delete This user `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosPublic.delete('/delete-user', uid)
                    .then(res => {
                        console.log(res);
                        Swal.fire({
                            title: "Congratulations!",
                            text: "User deletion successful",
                            icon: "success",
                            confirmButtonText: "OK",
                        })
                        refetch();
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        });

    }

    return (
        <div className="gradient1-bg min-h-screen">
            <div className="overflow-x-auto pt-20">
                <table className="table text-white">
                    {/* head */}
                    <thead className="text-white">
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Picture</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>User Type</th>
                            <th>Action</th>
                            <th>Delete User</th>
                        </tr>
                    </thead>

                    {
                        users.map(user => <tbody key={user?.email}>
                            {/* row 1 */}
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <Image src={user.photoURL ? user.photoURL : userIcon} width={50} height={50} alt="user-picture" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p>{user?.name}</p>
                                </td>
                                <td>
                                    <p>{user?.email}</p>
                                </td>
                                <td>
                                    <p>{user?.type}</p>
                                </td>
                                <td className="flex flex-col gap-2">
                                    {
                                        user.type === 'admin' ?
                                            <button onClick={() => makeUser(user)} className="btn btn-sm btn-outline text-white">Make User</button>
                                            :
                                            <button onClick={() => makeAdmin(user)} className="btn btn-sm btn-outline text-white">Make Admin</button>
                                    }
                                </td>
                                <td>
                                    <span onClick={() => handleDeleteUser(user.uid)} className="text-red-600 text-3xl cursor-pointer"><MdDelete /></span>
                                </td>
                            </tr>
                        </tbody>)
                    }
                </table>
            </div>
        </div>
    );
};

export default UsersManagement;