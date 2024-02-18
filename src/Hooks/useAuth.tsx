import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";

export default function useAuth(): any {
	const authInfo = useContext(AuthContext);
	return authInfo;
}
