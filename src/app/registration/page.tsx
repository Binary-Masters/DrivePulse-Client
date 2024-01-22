'use client'
import { FcGoogle } from "react-icons/fc";
import regImg from '../../assests/Login-Registration/registration.png'
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";


const Registration = () => {
    const [showPass, setShowPass] = useState(false);


    return (
        <div className="w-11/12 mx-auto mt-20 text-center">
            <div className="flex mx-auto flex-col gap-8 md:flex-row md:px-4">
                <div className='w-full lg:w-1/2 mt-32 mx-auto'>
                    <Image src={regImg} width={500} height={700} alt="regImg" />
                </div>
                <div className='w-full lg:w-1/2 mx-auto'>
                    <h1 className="text-5xl font-bold mb-4">Register now!</h1>
                    <div className="rounded-lg w-full shadow-2xl bg-base-100 px-4 py-6">
                        <form>
                            <div>
                                <label className="label">
                                    <span className="text-xl font-medium">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="Your name" className="input rounded-md w-full border-blue-600" required />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-xl font-medium">Email</span>
                                </label>
                                <input type="email" name='email' placeholder="Email" className="input rounded-md w-full border-blue-600" required />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-xl font-medium">Phone Number</span>
                                </label>
                                <input type="number" name='phoneNumber' placeholder="Your phone number" className="input rounded-md w-full border-blue-600" required />
                            </div>
                            <div>
                                <label className="label">
                                    <span className="text-xl font-medium">Your Photo</span>
                                </label>
                                <div>
                                    <input type="file" name='photo' placeholder="Please give your photo url" className="rounded-md w-full" required />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="label">
                                    <span className="text-xl font-medium">Password</span>
                                </label>
                                <input type={showPass ? 'text' : 'password'} name='password' placeholder="password" className="input rounded-md w-full border-blue-600" required />
                                <span onClick={() => setShowPass(!showPass)} className="absolute right-4 bottom-4 text-xl">
                                    {
                                        showPass ? <FaEye /> : <FaEyeSlash />
                                    }
                                </span>
                            </div>
                            <div className="form-control mt-6">
                                <input className='btn btn-primary capitalize text-xl font-semibold' type="submit" value="Register" />
                            </div>
                            <div className='text-center mt-4'>
                                <p>Already have account ? Please <Link href='/login' className='font-medium hover:underline text-primary ml-2'>Login</Link></p>
                            </div>
                        </form>
                        <div>
                            <div className="divider">OR Register With</div>
                            <div className="flex gap-2">
                                <button className='btn btn-outline w-1/2 text-lg hover:bg-primary border-blue-600 capitalize'><FcGoogle className='text-3xl mr-4'></FcGoogle>Google</button>
                                <button className='btn btn-outline  w-1/2 text-lg hover:bg-primary border-blue-600 capitalize'><FaFacebook className='text-3xl'></FaFacebook>Facebook</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;