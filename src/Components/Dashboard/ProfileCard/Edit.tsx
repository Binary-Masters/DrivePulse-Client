"use client";

import useAuth from "@/Hooks/useAuth";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import useGetSingleUser from "@/Hooks/useGetSingleUser";
import Swal from "sweetalert2";

const Edit = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useAuth();
    const [userData, loading, refetch]=useGetSingleUser()
  const updateValue = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const phoneNumber = e.target.number.value;
    const email = e.target.email.value;
    const photoURL = e.target.image.value;
    // console.log(name, number, email, image);
    const Data = {
      name,     
phoneNumber,
      email,
photoURL,
    };
    // console.log(Data)
    // put request 
    await axiosPublic.put(`/users?email=${user?.email}`,Data)
   .then(datass =>{
    if(datass){
       return Swal.fire({
        title: "Good job!",
        text: "Update successfully ",
        icon: "success"
      });
    }
    // console.log(datass?.id)
 })
 .catch(err =>{
    console.log(err)
 })
  };
  return (
    <div>
      <div className="hero min-h-screen ">
        <div className="hero-content flex-col ">
          <div className="card flex-shrink-0  shadow-2xl bg-slate-100 w-auto ">
            <form onSubmit={updateValue} className="card-body ">
              <p className="text-center text-3xl">Update Information</p>

              <div className="grid grid-cols-2 w-auto gap-6 ">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    defaultValue={userData?.name}
                    name="name"
                    type="text"
                    placeholder="title"
                    className="input input-bordered"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Number</span>
                  </label>
                  <input
                    defaultValue={userData?.phoneNumber}
                    name="number"
                    type="text"
                    placeholder="Number"
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>

              <label className="label">
                <span className="label-text">Image</span>
              </label>
              <input
                defaultValue={userData?.photoURL}
                name="image"
                type="text"
                placeholder="Image Url"
                className="input input-bordered"
                required
              />

              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                defaultValue={userData?.email}
                name="email"
                type="text"
                placeholder="Email"
                className="input input-bordered"
                required
                
              />
              <div className="form-control mt-6">
                <button className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
