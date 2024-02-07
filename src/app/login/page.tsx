"use client";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash, FaGithub } from "react-icons/fa";
import loginImg from "../../assests/Login-Registration/login4.jpg";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import useAuth from "@/Hooks/useAuth";
import "./style.css";
import useAxiosPublic from "@/Hooks/useAxiosPublic";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const { login, loginByGoogle, resetPassword, logout, loginByGithub } =
    useContext<any>(AuthContext);
  const { setLoading } = useAuth();
  const router = useRouter();
  const axiosPublic = useAxiosPublic();

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    login(email, password)
      .then((result) => {
        if (result.user.emailVerified) {
          router.push("/dashboard");
          setLoading(false);
          Swal.fire({
            title: "Congratulations!",
            text: "Logged in successfully",
            icon: "success",
            confirmButtonText: "OK",
          })
        } else {
          logout()
          .then(()=>{
            Swal.fire({
              title: "Opps You Didn't Verify Your Email!",
              text: "You Have To Verify Your Email Account And Try Again!",
              icon: "error",
            });
            form.reset();
          })
          .catch()
      }}) .catch((error) => {
        Swal.fire({
          title: "Error",
          text: error,
          icon: "error",
          confirmButtonText: "Close",
        });
      });
     
  };
  const handleLoginByGoogle = () => {
    loginByGoogle()
      .then((res) => {
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
            Swal.fire({
              title: "Congratulations!",
              text: "Logged in successfully",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              router.push("/dashboard");
              setLoading(false);
            });
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
  };
  const handleLoginByGithub = () => {
    loginByGithub()
      .then((res) => {
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
            Swal.fire({
              title: "Congratulations!",
              text: "Logged in successfully",
              icon: "success",
              confirmButtonText: "OK",
            }).then(() => {
              router.push("/dashboard");
              setLoading(false);
            });
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
  };

  return (
    <div
      className="min-h-screen bg-cover bg-opacity-30"
      style={{ backgroundImage: `url(${loginImg.src})` }}
    >
      <div className="w-11/12 mx-auto">
        <div className="mx-auto w-fit">
          <div className="pt-16">
            <p className="text-white text-5xl font-bold mb-4 text-center">
              Login now!
            </p>
            <div className="px-4 py-6 text-white bg-transparent border-2 border-indigo-600 rounded-lg shadow-2xl backdrop-blur-sm">
              <form onSubmit={handleLogin} className="relative">
                <div>
                  <label className="label">
                    <span className="text-xl font-medium">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className="h-6 focus:h-8 rounded-md px-2 outline-none w-full border-b-2 bg-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="text-xl font-medium">Password</span>
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    className="relative w-full h-6 px-2 bg-transparent border-b-2 border-white focus:outline-none focus:h-8 rounded-md"
                    required
                  />
                  <span
                    onClick={() => setShowPass(!showPass)}
                    className="absolute text-xl right-7"
                  >
                    {showPass ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
                <div className="mt-6 form-control">
                  <input
                    className="text-xl font-semibold text-white capitalize border-indigo-500 btn btn-outline hover:bg-primary rounded-md"
                    type="submit"
                    value="Login"
                  />
                </div>
                <div className="mt-4">
                  <Link
                    href="/forget-password"
                    className="text-red-600 text-center hover:underline"
                  >
                    Forget Password ?
                  </Link>
                  <p>
                    Do not have account ? Please{" "}
                    <Link href="/registration" className="ml-2 font-medium">
                      <span className="blink-text hover:text-yellow-400">
                        Create an account
                      </span>
                    </Link>
                  </p>
                </div>
              </form>
              <div>
                <div className="font-bold text-indigo-600 divider divider-primary">
                  OR Continue With
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleLoginByGoogle}
                    className="w-1/2 text-lg text-white capitalize border-blue-600 btn btn-outline hover:bg-primary"
                  >
                    <FcGoogle className="mr-4 text-3xl"></FcGoogle>
                    Google
                  </button>
                  <button
                    onClick={handleLoginByGithub}
                    className="w-1/2 text-lg text-white capitalize border-blue-600 btn btn-outline hover:bg-primary"
                  >
                    <FaGithub className="text-3xl"></FaGithub>
                    Github
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
