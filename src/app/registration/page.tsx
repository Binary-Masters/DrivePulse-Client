"use client";
import { FcGoogle } from "react-icons/fc";
import regImg from "../../assests/Login-Registration/registration.png";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaEye, FaEyeSlash } from "react-icons/fa";
import { useContext, useState } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import axios from "axios";
import useAuth from "@/Hooks/useAuth";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const image_hosting_key = process.env.NEXT_PUBLIC_IMG_HOSTING_API_KEY;
// console.log(process.env.NEXT_PUBLIC_IMG_HOSTING_API_KEY);
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Registration = () => {
	const [showPass, setShowPass] = useState(false);
	const router = useRouter();

	const { createUser, updateUser, loginByGoogle } = useContext<any | null>(
		AuthContext
	);
	const [imageUrl, setImageUrl] = useState("");
	const { user } = useAuth();
	console.log(user);

	const handleRegistration = (e) => {
		e.preventDefault();
		const form = e.target;
		const name = form.name.value;
		const email = form.email.value;
		const password = form.password.value;
		// console.log(name,email,photoUrl,password,type,phoneNumber);
		if (password.length < 6) {
			console.log("password must be six character");
		}
		if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,32}$/.test(password)) {
			console.log(
				"password at least one Upper case one special character one number"
			);
		}
		// console.log(name,email,photoUrl,password);
		createUser(email, password)
			.then(() => {
				updateUser(name, imageUrl).then(() => {
					Swal.fire({
						title: "Congratulations!",
						text: "You've been registered successfully",
						icon: "success",
						confirmButtonText: "OK",
					}).then(() => {
						router.push("/dashboard");
					});
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

	const handleLoginByGoogle = () => {
		loginByGoogle()
			.then(() => {
				Swal.fire({
					title: "Congratulations!",
					text: "You've been registered successfully",
					icon: "success",
					confirmButtonText: "OK",
				}).then(() => {
					router.push("/dashboard");
				});
			})
			.catch((error) => {
				console.log(error);
			});
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
		<>
			<div className="w-11/12 mx-auto mt-20 text-center">
				<div className="flex flex-col mx-auto gap-8 md:flex-row md:px-4">
					<div className="w-full mx-auto mt-32 lg:w-1/2">
						<Image
							src={regImg}
							width={500}
							height={700}
							alt="regImg"
						/>
					</div>
					<div className="w-full mx-auto lg:w-1/2">
						<h1 className="mb-4 text-5xl font-bold">
							Register now!
						</h1>
						<div className="w-full px-4 py-6 rounded-lg shadow-2xl bg-base-100">
							<form onSubmit={handleRegistration}>
								<div>
									<label className="label">
										<span className="text-xl font-medium">
											Name
										</span>
									</label>
									<input
										type="text"
										name="name"
										placeholder="Your name"
										className="w-full border-blue-600 input rounded-md"
										required
									/>
								</div>
								<div>
									<label className="label">
										<span className="text-xl font-medium">
											Email
										</span>
									</label>
									<input
										type="email"
										name="email"
										placeholder="Email"
										className="w-full border-blue-600 input rounded-md"
										required
									/>
								</div>
								<div>
									<label className="label">
										<span className="text-xl font-medium">
											Phone Number
										</span>
									</label>
									<input
										type="number"
										name="phoneNumber"
										placeholder="Your phone number"
										className="w-full border-blue-600 input rounded-md"
										required
									/>
								</div>
								<div>
									<label className="label">
										<span className="text-xl font-medium">
											Your Photo
										</span>
									</label>
									<div>
										<input
											type="file"
											onChange={handleUploadImageBB}
											name="image"
											placeholder="Please give your photo url"
											className="w-full rounded-md"
										/>
									</div>
								</div>

								<div className="relative">
									<label className="label">
										<span className="text-xl font-medium">
											Password
										</span>
									</label>
									<input
										type={showPass ? "text" : "password"}
										name="password"
										placeholder="password"
										className="w-full border-blue-600 input rounded-md"
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
							<div>
								<div className="divider">OR Register With</div>
								<div className="flex gap-2">
									<button
										onClick={handleLoginByGoogle}
										className="w-1/2 text-lg capitalize border-blue-600 btn btn-outline hover:bg-primary"
									>
										<FcGoogle className="mr-4 text-3xl"></FcGoogle>
										Google
									</button>
									<button className="w-1/2 text-lg capitalize border-blue-600 btn btn-outline hover:bg-primary">
										<FaFacebook className="text-3xl"></FaFacebook>
										Facebook
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Registration;
