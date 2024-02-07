'use client'
import LoadingAnimation from "@/Components/Animation/LoadingAnimation/LoadingAnimation";
import useGetAllUsers from "@/Hooks/useGetAllUsers";
import Image from "next/image";


const UsersManagement = () => {
    const [users, loading, refetch] = useGetAllUsers();
    console.log(users);
    if (loading) {
        return <LoadingAnimation />
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
                            <th>Action</th>
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
                                                <Image src={user?.photoUrl} width={50} height={50} alt="user-picture" />
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
                                <td className="flex flex-col gap-2">
                                    <button className="btn btn-sm btn-outline text-white">Make Admin</button>
                                    <button className="btn btn-sm btn-outline text-white">Make User</button>
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