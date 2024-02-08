"use client";
import LoadingAnimation from "@/Components/Animation/LoadingAnimation/LoadingAnimation";
import useAuth from "@/Hooks/useAuth";
import useGetAllUsers from "@/Hooks/useGetAllUsers";
import useUpdateSingleUser from "@/Hooks/useUpdateSingleUser";
import Image from "next/image";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";

const UsersManagement = () => {
  const [users, loading, refetch] = useGetAllUsers(); //load user from mongodb
  // console.log(users);
  const { user } = useAuth(); //current or loggedin user
  // console.log(user);
  const updateUser = useUpdateSingleUser();
  if (loading) {
    return <LoadingAnimation />;
  }

  const currentUser = users.find(
    (singleUser) => singleUser?.email === user?.email
  ); // match user current user and mongodb user
  // console.log(currentUser);

  const makeAdmin = () => {
    const userInfo = {
      email: currentUser?.email,
      name: currentUser.name,
      emailVerified: currentUser.emailVerified,
      phoneNumber: currentUser.phoneNumber,
      photoURL: currentUser.photoURL,
      uid: currentUser.uid,
      type: "admin",
    };
    updateUser(userInfo).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Congratulations!",
          text: "User is now an Admin",
          icon: "success",
          confirmButtonText: "OK",
        });
        refetch();
      }
    });
  };
  const makeUser = () => {
    const userInfo = {
      email: currentUser?.email,
      name: currentUser.name,
      emailVerified: currentUser.emailVerified,
      phoneNumber: currentUser.phoneNumber,
      photoURL: currentUser.photoURL,
      uid: currentUser.uid,
      type: "user",
    };
    updateUser(userInfo).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Congratulations!",
          text: "User is now an Admin",
          icon: "success",
          confirmButtonText: "OK",
        });
        refetch();
      }
    });
  };

  // delete user
  const deleteUser = () => {
    console.log("user will be deleted");
  };

  return (
    <div className="gradient1-bg min-h-screen">
      <div className="overflow-x-auto pt-20">
        <table className="table text-white">
          {/* head */}
          <thead className="text-white">
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Action</th>
              <th>Delete User</th>
            </tr>
          </thead>

          
            <tbody>
              {/* row 1 */}

              {
                users?.map((user, index)=><tr key={index}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <Image
                          src={user.photoURL}
                          width={50}
                          height={50}
                          alt="user-picture"
                        />
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
                <td className="flex flex-col gap-2 pt-5">
                  {user.type === "admin" ? (
                    <button
                      onClick={() => makeUser()}
                      className="btn btn-sm btn-outline hover:bg-primary text-white">
                      Make User
                    </button>
                  ) : (
                    <button
                      onClick={() => makeAdmin()}
                      className="btn btn-sm btn-outline hover:bg-primary text-white">
                      Make Admin
                    </button>
                  )}
                </td>
                <td>
                  <span
                    onClick={deleteUser}
                    className="text-red-600 text-3xl cursor-pointer">
                    <MdDelete />
                  </span>
                </td>
              </tr>)
              }
            </tbody>
         
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
