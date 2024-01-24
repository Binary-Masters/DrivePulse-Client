'use client'
import { FcGoogle } from "react-icons/fc";
import regImg from '../../assests/Login-Registration/registration.png'
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const image_hosting_key =  process.env.NEXT_PUBLIC_IMG_HOSTING_API_KEY;
// console.log(process.env.NEXT_PUBLIC_IMG_HOSTING_API_KEY);
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Registration = () => {
    const [showPass, setShowPass] = useState(false);

    const { createUser, updateUser, loginByGoogle } = useContext(AuthContext);
    const [imageUrl, setImageUrl] = useState('');

    const handleRegistration = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const phoneNumber = form.phoneNumber.value;
        const password = form.password.value;
        // console.log(name,email,photoUrl,password,type,phoneNumber);
        if (password.length < 6) {
            console.log('password must be six character');
        }
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,32}$/.test(password)) {
          console.log('password at least one Upper case one special character one number');
        }
        // console.log(name,email,photoUrl,password);
        createUser(email, password)
            .then(result => {
                console.log(result);
                updateUser(name, imageUrl)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch(error => {
                       console.log(error);
                    })

            })
            .catch(error => {
               console.log(error);
            })
    }


    const handleLoginByGoogle = () => {
        loginByGoogle()
            .then(result => {
                console.log(result);
            })
            .catch(error => {
               console.log(error);
            })
    }

    const handleUploadImageBB = async (e) => {
        const image = e.target.files[0]
        console.log(image);
        const imageFile = { image: image }
        console.log(imageFile);
        const res = await axios.post(image_hosting_url, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        console.log('Image url', res.data.data.display_url);
        setImageUrl(res.data.data.display_url);
    }

    return (
        <div className="w-11/12 mx-auto mt-20 text-center">
            <div className="flex mx-auto flex-col gap-8 md:flex-row md:px-4">
                <div className='w-full lg:w-1/2 mt-32 mx-auto'>
                    <Image src={regImg} width={500} height={700} alt="regImg" />
                </div>
                <div className='w-full lg:w-1/2 mx-auto'>
                    <h1 className="text-5xl font-bold mb-4">Register now!</h1>
                    <div className="rounded-lg w-full shadow-2xl bg-base-100 px-4 py-6">
                        <form onSubmit={handleRegistration}>
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
                                    <input type="file" onChange={handleUploadImageBB} name='image' placeholder="Please give your photo url" className="rounded-md w-full" required />
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
                                <button onClick={handleLoginByGoogle} className='btn btn-outline w-1/2 text-lg hover:bg-primary border-blue-600 capitalize'><FcGoogle className='text-3xl mr-4'></FcGoogle>Google</button>
                                <button className='btn btn-outline  w-1/2 text-lg hover:bg-primary border-blue-600 capitalize'><FaFacebook className='text-3xl'></FaFacebook>Facebook</button>
                            </div>
                        </div>
                    </div>
                </div>
            <ToastContainer></ToastContainer>
            </div>
        </div>
    );
};

export default Registration;