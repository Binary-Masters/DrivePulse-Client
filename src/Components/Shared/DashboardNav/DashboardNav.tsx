"use client";
import { Menu } from "lucide-react";
import Image from "next/image";
import logo from "@/../../public/logo.png";
import img from "@/assests/images/blank-head-profile-pic-for-a-man.jpg";
import { useState, useEffect, useRef } from "react";
import SideNave from "@/Components/SideNave/SideNave";

const DashboardNav = () => {
	const [isToggle, setIsToggle] = useState(false);
	
	// Modifies sidebar position with navbar height
	const navbarRef = useRef<HTMLDivElement | null>(null)
	const [ navbarHeight, setNavbarHeight ] = useState(navbarRef.current?.scrollHeight || 0);
	console.log(navbarHeight);
	useEffect(() => {
		const scrollHeight = navbarRef.current?.scrollHeight
		if(scrollHeight) {
			setNavbarHeight(scrollHeight)
		}
	}, [])
	
	return (<>
		<div ref={ navbarRef } className="flex items-center justify-between p-3 border-b shadow ">
			<button onClick={() => setIsToggle(!isToggle)}>
				<Menu className="md:hidden" />
			</button>
			{/* <Image
				width={100}
				height={50}
				src={logo}
				alt="logo"
				className="hidden"
			/> */}

			<div className="relative">
				<label htmlFor="Search" className="sr-only">
					{" "}
					Search{" "}
				</label>

				<input
					type="text"
					id="Search"
					placeholder="Search for..."
					className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm"
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
			<div className="avatar online">
				<div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
					<Image src={img} alt="logo" />
				</div>
			</div>
		</div>
		
		{/* Sidebar */}
		<div className={`absolute top-[${navbarHeight}] z-50 ${ isToggle ? "block" : "hidden" } flex-col w-[60%] min-w-[280px] debug h-full bg-white md:hidden`}>
			<SideNave/>
		</div>
	</>
	);
};

export default DashboardNav;
