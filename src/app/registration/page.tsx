"use client";
import regImg from "../../assests/Login-Registration/registration.png";
import Image from "next/image";
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
import animationData from "../../assests/lottie-animation/Registration.json";
import "./style.css";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

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
    // console.log(name,email,photoUrl,password,type,phoneNumber);
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
            console.log(res);
            updateUser(name, imageUrl).then().catch();
            verifyEmail().then().catch();
            const userInfo = {
              email: res.user?.email,
              name: res.user?.displayName,
              emailVerified: res?.user?.emailVerified,
              phoneNumber: res?.user?.phoneNumber,
              photoURL: res?.user?.photoURL,
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
    <div
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
                    className="w-full regStyle border-blue-600 input rounded-md bg-transparent"
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
                    className="w-full regStyle border-blue-600 input rounded-md bg-transparent"
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
                    className="w-full regStyle border-blue-600 input rounded-md bg-transparent"
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
    </div>
  );
};

export default Registration;
