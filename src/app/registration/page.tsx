"use client";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import axios from "axios";
import useAuth from "@/Hooks/useAuth";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import backgroundImg from "../../assests/Login-Registration/banner.jpg";
import Lottie from "lottie-react";
import "./style.css";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
import { error } from "console";
import img from "../../assests/images//registration.jpg"

const image_hosting_key = process.env.NEXT_PUBLIC_IMG_HOSTING_API_KEY;
// console.log(process.env.NEXT_PUBLIC_IMG_HOSTING_API_KEY);
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Registration = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useRouter();
  const axiosPublic = useAxiosPublic();

  const { createUser, updateUser, verifyEmail } = useContext<any | null>(
    AuthContext
  );
  const [imageUrl, setImageUrl] = useState("");
  const { user, setLoading, logout } = useAuth();

  const handleRegistration = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(name, email, password);
    if (password.length < 6) {
      Swal.fire({
        title: "Opps!!",
        text: "password must be six character",
        icon: "error",
        confirmButtonText: "Close",
      });
    } else {
      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,32}$/.test(password)) {
        Swal.fire({
          title: "Opps!!",
          text: "password at least one Upper case one special character one number",
          icon: "error",
          confirmButtonText: "Close",
        });
      } else {
        // console.log(name,email,photoUrl,password);
        createUser(email, password)
          .then((res) => {
            // console.log(res);
            updateUser(name, imageUrl).then().catch();
            verifyEmail().then().catch();
            const userInfo = {
              email: res.user?.email,
              name: name,
              emailVerified: res?.user?.emailVerified,
              phoneNumber: res?.user?.phoneNumber,
              photoURL: imageUrl,
              uid: res?.user?.uid,
              type: "user",
            };

            axiosPublic
              .post("/users", userInfo)
              .then(() => {
                logout().then().catch();
                Swal.fire({
                  title: "Verify Email",
                  text: "Please Check Your Mail And Verify",
                  icon: "success",
                  confirmButtonText: "OK",
                });
                router.push("/login");
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((error) => {
            Swal.fire({
              title: "Error",
              text: error,
              icon: "error",
              confirmButtonText: "Close",
            });
          });
      }
    }
  };

  const handleUploadImageBB = async (e) => {
    const image = e.target.files[0];
    console.log(image);
    const imageFile = { image: image };
    console.log(imageFile);
    const res = await axios.post(image_hosting_url, imageFile, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Image url", res.data.data.display_url);
    setImageUrl(res.data.data.display_url);
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row min-h-screen registration-bg">
      <div className="lg:w-[55%]  flex justify-center lg:justify-end h-fit">
        <div
          style={{
            backdropFilter: "blur(50px)",
            boxShadow: "0px 0px 20px #16aae0",
          }}
          className="mx-5 lg:w-[60%] -mt-10 lg:mt-20 p-6 py-14 rounded-md lg:-mr-14">
          <form onSubmit={handleRegistration} className="space-y-6">
            <div className="relative w-full min-w-[200px] h-[45px]">
              <input
                className="peer w-full h-full bg-transparent  text-primary font-sans font-normal outline outline-0 focus:outline-0  transition-all placeholder-shown:border placeholder-shown:border-slate-400  border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-4 rounded focus:border-primary"
                placeholder=" "
                type="text"
                required
                name="name"
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-primary leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-primary transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2  peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-primary before:border-blue-gray-200 peer-focus:before:!border-primary after:border-blue-gray-200 peer-focus:after:!border-primary">
                Name
              </label>
            </div>
            <div className="relative w-full min-w-[200px] h-[45px]">
              <input
                className="peer w-full h-full bg-transparent  text-primary font-sans font-normal outline outline-0 focus:outline-0  transition-all placeholder-shown:border placeholder-shown:border-slate-400  border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-4 rounded focus:border-primary"
                placeholder=" "
                type="email"
                required
                name="email"
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-primary leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-primary transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2  peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-primary before:border-blue-gray-200 peer-focus:before:!border-primary after:border-blue-gray-200 peer-focus:after:!border-primary">
                Email
              </label>
            </div>
            <input type="file" name="image" onChange={handleUploadImageBB} className="file-input file-input-info w-full bg-transparent text-primary h-[45px]" />
            <div className="relative w-full min-w-[200px] h-[45px]">
              <input
                className="peer w-full h-full bg-transparent text-primary font-sans font-normal outline outline-0 focus:outline-0  transition-all placeholder-shown:border placeholder-shown:border-slate-400  border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-4 rounded focus:border-primary"
                placeholder=" "
                type="password"
                name="password"
                required
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-primary leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-primary transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-blue-gray-400 peer-focus:text-primary before:border-blue-gray-200 peer-focus:before:!border-primary after:border-blue-gray-200 peer-focus:after:!border-primary">
                Password
              </label>
            </div>
            <button type="submit" className="registration-btn">
              Registration
            </button>
          <p className="text-slate-300">Already have an accoun?  <Link href={"/login"} className="text-primary link-hover">Login</Link></p>
          </form>
          
        </div>
      </div>
      <div
        className="h-[40vh] lg:h-[100vh] flex items-center bg-cover bg-opacity-80 lg:w-[45%]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0, 0.5)),url(${img?.src})`,
        }}>
        <div className="w-[80%] pl-4 lg:pl-20">
          <h2 className="text-3xl md:text-5xl text-slate-300 font-semibold">
            Create a new <span className="text-primary">account</span>
          </h2>
          <p className="text-slate-300 mt-2">
            Create a new account and continue best real-time file sharing secure platform drivePulse!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;

//! comment in prev registration page
{/* <div
className="min-h-screen bg-cover bg-opacity-30"
style={{ backgroundImage: `url(${backgroundImg.src})` }}
>
<div className="w-11/12 mx-auto pt-8 text-center">
  <div className="flex flex-col mx-auto gap-8 md:flex-row-reverse md:px-4">
    <div className="w-full mx-auto mt-20 lg:w-1/2">
      <Lottie animationData={animationData} />
    </div>
    <div className="w-full mx-auto lg:w-1/2">
      <h1 className="mb-4 text-5xl font-bold text-white">
        Register now!
      </h1>
      <div className="px-4 py-6 text-white bg-transparent border-2 border-indigo-600 rounded-lg shadow-2xl backdrop-blur-md">
        <form onSubmit={handleRegistration}>
          <div>
            <label className="label">
              <span className="text-xl font-medium">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="w-full regStyle focus:border-blue-600 border-blue-600 input rounded-md bg-transparent"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="text-xl font-medium">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full regStyle focus:border-blue-600 border-blue-600 input rounded-md bg-transparent"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="text-xl font-medium">Your Photo</span>
            </label>
            <div>
              <input
                type="file"
                onChange={handleUploadImageBB}
                name="image"
                placeholder="Please give your photo url"
                className="w-full regStyle rounded-md border-2 border-blue-600 border-b-white bg-transparent"
              />
            </div>
          </div>

          <div className="relative">
            <label className="label">
              <span className="text-xl font-medium">Password</span>
            </label>
            <input
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="password"
              className="w-full regStyle focus:border-blue-600 border-blue-600 input rounded-md bg-transparent"
              required
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="absolute text-xl right-4 bottom-4"
            >
              {showPass ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <div className="mt-6 form-control">
            <input
              className="text-xl font-semibold capitalize btn btn-primary"
              type="submit"
              value="Register"
            />
          </div>
          <div className="mt-4 text-center">
            <p>
              Already have account ? Please{" "}
              <Link
                href="/login"
                className="ml-2 font-medium hover:underline text-primary"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
</div> */}