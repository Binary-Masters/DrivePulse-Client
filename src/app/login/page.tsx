'use client';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook,FaEye ,FaEyeSlash} from "react-icons/fa";
import loginImg from '../../assests/Login-Registration/login4.jpg'
import Link from "next/link";
import { useState } from "react";


const Login = () => {
    const [showPass, setShowPass] = useState(false);

    return (
        <div className="min-h-screen bg-cover bg-opacity-80" style={{ backgroundImage: `url(${loginImg.src})` }}>
            <div className="w-11/12 mx-auto">
                <div className="w-fit mx-auto">
                    <div className='pt-16'>
                        <h1 className="text-5xl font-bold mb-4 text-white text-center">Login now!</h1>
                        <div className="rounded-lg shadow-2xl backdrop-blur-sm border-2 border-indigo-600 bg-transparent text-white px-4 py-6">
                            <form >
                                <div>
                                    <label className="label">
                                        <span className="text-xl font-medium">Email</span>
                                    </label>
                                    <input type="email" name='email' placeholder="email" className="h-6 focus:h-8 rounded-md px-2 outline-none w-full border-b-2 bg-transparent" required />
                                </div>
                                <div>
                                    <label className="label">
                                        <span className="text-xl font-medium">Password</span>
                                    </label>
                                    <input type={showPass ? 'text':'password'} name='password' placeholder="password" className="h-6 focus:h-8 relative rounded-md px-2 outline-none w-full border-b-2 bg-transparent" required />
                                    <span onClick={()=>setShowPass(!showPass)} className="absolute right-7 text-xl">
                                        {
                                            showPass ? <FaEye /> : <FaEyeSlash />
                                        }
                                    </span>
                                </div>
                                <div className="form-control mt-6">
                                    <input className='btn btn-outline border-indigo-500 text-white hover:bg-primary rounded-md capitalize text-xl font-semibold' type="submit" value="Login" />
                                </div>
                                <div className='text-center mt-4'>
                                    <p>Do not have account ? Please <Link href='/registration' className='font-medium hover:underline ml-2 text-gray-300 hover:text-white'>Create an account</Link></p>
                                </div>
                            </form>
                            <div>
                                <div className="divider divider-primary text-indigo-600 font-bold">OR</div>
                                <div className="flex gap-2">
                                    <button className='btn btn-outline text-white w-1/2 text-lg hover:bg-primary border-blue-600 capitalize'><FcGoogle className='text-3xl mr-4'></FcGoogle>Login With Google</button>
                                    <button className='btn btn-outline text-white w-1/2 text-lg hover:bg-primary border-blue-600 capitalize'><FaFacebook className='text-3xl'></FaFacebook>Login With Facebook</button>
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