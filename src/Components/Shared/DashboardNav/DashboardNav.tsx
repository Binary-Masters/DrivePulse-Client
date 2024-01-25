"use client";
import { Menu } from "lucide-react";
import Image from "next/image";
import logo from "@/../../public/logo.png";
import img from "@/assests/images/blank-head-profile-pic-for-a-man.jpg";
import { useState, useEffect, useRef } from "react";
import SideNave from "@/Components/SideNave/SideNave";
import useAuth from "@/Hooks/useAuth";
import {useRouter} from "next/navigation";

const DashboardNav = () => {
	const [isToggle, setIsToggle] = useState(false);
	const { user, logout } = useAuth();
	const router = useRouter();

	// Modifies sidebar position with navbar height
	const navbarRef = useRef<HTMLDivElement | null>(null);
	const [navbarHeight, setNavbarHeight] = useState(
		navbarRef.current?.scrollHeight || 0
	);
	useEffect(() => {
		const scrollHeight = navbarRef.current?.scrollHeight;
		if (scrollHeight) {
			setNavbarHeight(scrollHeight);
		}
	}, []);
	
	const handleLogout = () => {
		logout()
		.then(() => {
			router.push("/");
		})
	}

	return (
		<>
			<div
				ref={navbarRef}
				className="flex items-center justify-between px-4 py-3 border-b shadow gap-2 "
			>
				<button onClick={() => setIsToggle(!isToggle)}>
					<Menu className="md:hidden" />
				</button>
				{/* <Image */}
				{/* 	width={100} */}
				{/* 	height={50} */}
				{/* 	src={logo} */}
				{/* 	alt="logo" */}
				{/* 	className="hidden" */}
				{/* /> */}

				<div className="relative">
					<label htmlFor="Search" className="sr-only">
						{" "}
						Search{" "}
					</label>

					<input
						type="text"
						id="Search"
						placeholder="Search for..."
						className="w-full pl-2 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
					/>

					<span className="absolute inset-y-0 w-10 end-0 grid place-content-center">
						<button
							type="button"
							className="text-gray-600 hover:text-gray-700"
						>
							<span className="sr-only">Search</span>

							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth="1.5"
								stroke="currentColor"
								className="w-4 h-4"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
								/>
							</svg>
						</button>
					</span>
				</div>
				{/* <div className="dropdown dropdown-right dropdown-end"> */}
				{/* <div tabIndex={0} role="button" className="m-1 btn">Click</div> */}
				{/* <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"> */}
				{/* <li><a>Item 1</a></li> */}
				{/* <li><a>Item 2</a></li> */}
				{/* </ul> */}
				{/* </div> */}
				<div className="dropdown dropdown-end">
					<div tabIndex={0} role="button">
						<div className="flex items-center gap-2 btn btn-ghost">
							{/* user avatar */}
							<div className="w-10 h-10 avatar online">
								<div className="rounded-full">
									<Image
										src={user?.photoURL || img}
										height={40}
										width={40}
										alt="User avatar"
										style={{ objectFit: "cover" }}
									/>
								</div>
							</div>
						</div>
					</div>
					<ul
						tabIndex={0}
						className="dropdown-content divide-y shadow-md z-[1] menu p-2 bg-base-100 border rounded-box w-52"
					>
						<li>
							<a className="mx-auto">
								{/* user info */}
								<div className="text-center">
									<h4 className="text-sm font-normal">
										{user?.displayName}
									</h4>
									<h5 className="text-xs font-semibold">
										{user?.email}
									</h5>
								</div>
							</a>
						</li>
						<li onClick={ handleLogout }>
							<a>Logout</a>
						</li>
					</ul>
				</div>
			</div>

			{/* Sidebar */}
			<div
				className={`absolute top-[${navbarHeight}] z-50 ${
					isToggle ? "block" : "hidden"
				} flex-col w-[60%] min-w-[280px] debug h-full bg-white md:hidden`}
			>
				<SideNave />
			</div>
		</>
	);
};

export default DashboardNav;
