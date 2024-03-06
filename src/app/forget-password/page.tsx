"use client";
import useAuth from "@/Hooks/useAuth";
import { useState } from "react";
import animation from "../../assests/lottie-animation/reset-pass.json"
import Lottie from "lottie-react";
const ForgetPassword = () => {
  const { sendPassResetEmail } = useAuth();
  const [isEmailSend, setIsEmailSend] = useState(false);
  const handleChangeSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    sendPassResetEmail(email)
      .then(() => {
        setIsEmailSend(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className=" gap-5 gradient2-bg min-h-screen">
      <div className="flex flex-col md:flex-row md:h-[100vh] items-center max-w-6xl mx-auto gap-10 px-5">
      <div className="md:w-[400px]">
            <Lottie animationData={animation}/>
      </div>
      <div style={{backdropFilter:"blur(50px)", boxShadow:"0px 0px 20px #16aae0"}} className="flex-1  p-10 rounded-md">
      <h1 className="text-3xl font-bold text-center text-slate-300 my-10">
        Reset Your <span className="text-primary">Password</span>
      </h1>
      <div className=" rounded-md">
        <form onSubmit={handleChangeSubmit}>
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
          <div className="form-control mt-6">
            <button type="submit" className="btn bg-primary hover:bg-blue-600 text-white border-0 text-lg">
              Forget
            </button>
          </div>
        </form>
        {isEmailSend && (
          <p className="text-green-500 font-bold">
            An Email has been sent for reset your password
          </p>
        )}
      </div>
      </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
