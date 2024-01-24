import { AuthContext } from "@/providers/AuthProvider";
import { useContext } from "react";

export default function useAuth() {
	const authInfo = useContext(AuthContext);
	return authInfo;
}
