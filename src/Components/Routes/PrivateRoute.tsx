"use client"
import useAuth from "@/Hooks/useAuth";
import {useEffect} from "react";
import {useRouter} from "next/navigation";

interface ReactRouterProps {
	children: React.ReactNode;
}

function PrivateRoute({ children }: ReactRouterProps):JSX.Element | null {
	const { isAuthenticated } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if(!isAuthenticated) router.push("/login");
	}, [isAuthenticated, router])

	return isAuthenticated ? <>{ children }</> : null;
}

export default PrivateRoute;
