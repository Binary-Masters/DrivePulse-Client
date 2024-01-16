"use client"

import Link from "next/link"
import {useState} from "react";
import { FaBars } from "react-icons/fa6";


export default function Navbar() {
	const [ toggleSidebar, setToggleSidebar ] = useState(false);
	const routes = [
		{ path: "/", label: "Home" },
		{ path: "/about", label: "About" },
		{ path: "/pricing", label: "Pricing" },
		{ path: "/developers", label: "Developers" },
		{ path: "/register", label: "Register" },
		{ path: "/login", label: "Login" },
	]
	const dividerPosition = 3;
	
	return <div className="navbar px-4 md:px-14">
		<div className="navbar-start gap-2 text-2xl md:text-3xl">
			<p><FaBars className="text-xl md:hidden min-w-1"/></p>
			<h1>DrivePulse</h1>
		</div>
		
		{/* visible for larger devices */}
		<div className="navbar-end gap-6 hidden md:flex">
			{ 
				routes.map((route, i) => <>
					<Link 
						key={ route.path + route.label } 
						href={ route.path }
						className="group"
					>
						{ route.label }
						
						{/* Underlay */}
						<div className="w-0 rounded-full hidden md:block h-[2px] group-hover:w-full delay-100 ease-out transition-all bg-primary"></div>
					</Link>
					{ 
						(routes.length - dividerPosition === i) 
						&& <div className="divider -mx-2 divider-horizontal divider-primary"></div>
					}
				</>)
			}
		</div>
		
		{/* visible for medium and smaller devices */}
		<div className="md:hidden navbar-end">
			<div className="divider divider-horizontal divider-primary"></div>
			<Link href="/login">Login</Link>
		</div>
		
		{/* Sidebar */}
		<div className="debug absolute top-0 left-0 min-w-[280px] backdrop-blur-2xl bg-opacity-10 bg-neutral w-[60%]">
			<ul>
			{
				routes.map((route, i) => <>
					<li>
						<Link 
							key={ route.path + route.label } 
							href={ route.path }
						>
							{ route.label }
						</Link>
					</li>
				</>)
			}
			</ul>
		</div>
	</div>
}
