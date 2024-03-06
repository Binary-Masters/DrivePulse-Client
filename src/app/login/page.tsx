/* eslint-disable react/no-unescaped-entities */
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
import img from "../../assests/images/login.jpg";
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
          const userInfo = {
            email: result.user?.email,
            name: result.user?.name,
            emailVerified: result?.user?.emailVerified,
            phoneNumber: result?.user?.phoneNumber,
            photoURL: result?.user?.photoURL,
            uid: result?.user?.uid,
            type: "user",
          };

          axiosPublic
            .put("/user", userInfo)
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
        } else {
          logout()
            .then(() => {
              Swal.fire({
                title: "Opps You Didn't Verify Your Email!",
                text: "You Have To Verify Your Email Account And Try Again!",
                icon: "error",
              });
              form.reset();
            })
            .catch();
        }
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
            });
            router.push("/dashboard");
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
        router.push("/dashboard");
        setLoading(false);
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
            });
            router.push("/dashboard");
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
        router.push("/dashboard");
        setLoading(false);
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
    <div className="flex flex-col lg:flex-row login-bg h-screen">
      {/* <div
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
    </div> */}
      <div
        className="h-[40vh] lg:h-[100vh] flex items-center bg-cover bg-opacity-80 lg:w-[45%]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0, 0.7)),url(${img?.src})`,
        }}>
        <div className="w-[80%] pl-4 md:pl-10">
          <h2 className="text-3xl md:text-5xl text-slate-300 font-semibold">
            <span className="text-primary">Welcome</span> back!
          </h2>
          <p className="text-slate-300 mt-2">
            This is a best secure file sharing platform, Upload your file and make your beautiful day!
          </p>
        </div>
      </div>
      <div className="lg:w-[55%] ">
        <div
          style={{
            backdropFilter: "blur(50px)",
            boxShadow: "0px 0px 20px #16aae0",
          }}
          className="mx-5 lg:w-[60%] -mt-10 lg:mt-32 p-6 py-10 rounded-md lg:-ml-20">
          <form onSubmit={handleLogin} className="space-y-4 ">
            <div className="relative w-full min-w-[200px] h-10">
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
            <div className="relative w-full min-w-[200px] h-10">
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
            <button type="submit" className="login-btn">
              login
            </button>
            <Link
              href="/forget-password"
              className="text-primary font-medium link-hover cursor-pointer">
              Forget password?
            </Link>
            <p className="text-slate-300">
              Don't have any account?{" "}
              <Link href={"/registration"} className="text-primary link">
                Create new account
              </Link>
            </p>
          </form>
          <div className="divider divider-info text-slate-400">
            Continue with
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleLoginByGoogle}
              className="w-1/2 text-lg text-white capitalize border-primary btn btn-outline hover:bg-primary transition-all duration-300">
              <FcGoogle className="mr-4 text-2xl"></FcGoogle>
              Google
            </button>
            <button
              onClick={handleLoginByGithub}
              className="w-1/2 text-lg text-white capitalize border-primary btn btn-outline hover:bg-primary">
              <FaGithub className="text-2xl"></FaGithub>
              Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
