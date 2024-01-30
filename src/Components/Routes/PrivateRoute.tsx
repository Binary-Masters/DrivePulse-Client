"use client";
import useAuth from "@/Hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingAnimation from "../Animation/LoadingAnimation/LoadingAnimation";

interface ReactRouterProps {
	children: React.ReactNode;
}

function PrivateRoute({ children }: ReactRouterProps): JSX.Element | null {
	const { user, loading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if(!loading && !user) router.replace("/login");
	}, [loading, user, router]);
	
	if (loading) <LoadingAnimation />;
	
	return user ? <>{ children }</> : null
}

export default PrivateRoute;
