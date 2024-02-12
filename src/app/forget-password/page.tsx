"use client";
import useAuth from "@/Hooks/useAuth";
import { useState } from "react";
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
        <div className="w-11/12 mx-auto">
            <h1 className="text-3xl font-bold text-center mt-10">Reset Your Password</h1>
            <div className="w-96 mx-auto">
                <form onSubmit={handleChangeSubmit} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Your Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Type your email"
                            className="input input-outline input-accent"
                            required
                        />
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-accent">
                            Forget
                        </button>
                    </div>
                </form>
                {
                    isEmailSend && <p className="text-green-500 font-bold">An Email has been sent for reset your password</p>
                }
            </div>
        </div>
    );
};

export default ForgetPassword;
