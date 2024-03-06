"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	EmailAuthProvider,
	reauthenticateWithCredential,
	updatePassword,
	sendPasswordResetEmail,
	updateProfile,
	User,
	UserCredential,
	GithubAuthProvider,
	sendEmailVerification,
	updateEmail,
	deleteUser
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// import { FacebookAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import StorageProvider from "./StorageProvider";
import useAxiosPublic from "@/Hooks/useAxiosPublic";
export interface AuthInfo {
	user: any;
	loading: boolean;
	isAuthenticated: boolean;
	createUser: (email: string, password: string) => Promise<UserCredential>;
	login: (email: string, password: string) => Promise<UserCredential>;
	loginByGoogle: () => Promise<UserCredential>;
	loginByGithub: () => Promise<UserCredential>;
	// loginByFacebook: () => Promise<UserCredential>;
	updateUserPassword: any;
	resetPassword: any;
	sendPassResetEmail: any;
	credential: any;
	verifyEmail: any;
	// test 
	changeemail: any;
	logout: () => Promise<void>;
	deleteAnyUser: (aUser: any) => Promise<void>;
	setLoading: (value: boolean) => void;
	updateUser: (name: string, photoURL: string) => Promise<void> | undefined;
}

export const AuthContext = createContext({});
// export const AuthContext = createContext<AuthInfo>({} as AuthInfo);

// const FB_Provider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	console.log(user);
	const [loading, setLoading] = useState<boolean>(true);
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
	const axiosPublic = useAxiosPublic();
	const createUser = async (
		email: string,
		password: string
	): Promise<UserCredential> => {
		setLoading(true);
		try {
			const result = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			return result;
		} finally {
			setLoading(false);
		}
	};

	const credential = async (pass: string): Promise<void | null> => {
		if (!user) {
			console.error("User is null. Cannot reauthenticate.");
			return null;
		}

		const cred = EmailAuthProvider.credential(user.email || "", pass); // Ensure user.email is not null
		try {
			await reauthenticateWithCredential(user, cred);
		} catch (error) {
			console.error("Reauthentication error:", error);
			// Handle the error, depending on your use case
			return null;
		}
	};

	// update password
	const updateUserPassword = async (
		newPass: string
	): Promise<void | null> => {
		if (!user) {
			console.error("User is null. Cannot update password.");
			return null;
		}

		try {
			await updatePassword(user, newPass);
		} catch (error) {
			console.error("Update password error:", error);
			// Handle the error, depending on your use case
			return null;
		}
	};

	// password reset email
	const sendPassResetEmail = async (email: string): Promise<void | null> => {
		try {
			await sendPasswordResetEmail(auth, email);
		} catch (error) {
			console.error(error);
			// Handle the error, depending on your use case
			return null;
		}
	};

	// Email verification
	const verifyEmail = () => {
		const currentUser = auth.currentUser;
		if (currentUser) {
			return sendEmailVerification(currentUser);
		}
	};

	// const loginByFacebook = () => {
	//   const FB_Provider = new FacebookAuthProvider();
	//   setLoading(true);
	//   return signInWithPopup(auth, FB_Provider);
	// };

	//Github Authentication
	const loginByGithub = () => {
		setLoading(true);
		return signInWithPopup(auth, githubProvider);
	};

	// password reset
	const resetPassword = async (email: string) => {
		return sendPasswordResetEmail(auth, email);
	};

	// login with gmail and password
	const login = (email: string, password: string) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	// login with google account
	const loginByGoogle = () => {
		const provider = new GoogleAuthProvider();
		setLoading(true);
		return signInWithPopup(auth, provider);
	};
	// update user 

	// update user Like name and Photo
	const updateUser = (name: string, photoURL: string) => {
		setLoading(true);
		const currentUser = auth.currentUser;
		// console.log(currentUser);
		// console.log(name,photoURL);
		if (currentUser) {
			return updateProfile(currentUser, {
				displayName: name,
				photoURL: photoURL,
			});
		}
	};
	// test 
	// update email 
	const changeemail = (email: string) => {
		setLoading(true)
		const currentUser = auth.currentUser
		if (currentUser) {
			return updateEmail(currentUser, email)
		}
	}
	// logout 

	// Logout
	const logout = () => {
		setLoading(true);
		return signOut(auth);
	};
	// hold your user 

	// Delete User
	const deleteAnyUser = (user: any) => {
		setLoading(true);
		return deleteUser(user)
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			const userEmail = { email: user?.email };
			if (user) {
				setUser(user);
				setIsAuthenticated(true);
				setLoading(false);
				axiosPublic.post('/jwt', userEmail, { withCredentials: true })	//sent email for jwt
					.then(result => {
						console.log(result);
					})
			}
			else {
				axiosPublic.post('/logout', userEmail, { withCredentials: true })
					.then(result => {
						console.log(result);
					})
			}
		});

		return () => {
			unsubscribe();
		};
	}, [axiosPublic]);
	// 
	const authInfo: AuthInfo = {
		user,
		isAuthenticated,
		loading,
		createUser,
		updateUserPassword,
		resetPassword,
		credential,
		login,
		loginByGoogle,
		logout,
		setLoading,
		updateUser,
		// loginByFacebook,
		loginByGithub,
		sendPassResetEmail,
		verifyEmail,
		changeemail,
		deleteAnyUser,
	};

	return (
		<AuthContext.Provider value={authInfo}>
			<StorageProvider>{children}</StorageProvider>
		</AuthContext.Provider>
	);
};

export default AuthProvider;
