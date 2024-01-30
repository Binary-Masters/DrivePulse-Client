"use client";

import { createContext, ReactNode, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
	updateProfile,
	User,
	UserCredential,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { FacebookAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
export interface AuthInfo {
	user: any;
	loading: boolean;
	isAuthenticated: boolean;
	createUser: (email: string, password: string) => Promise<UserCredential>;
	login: (email: string, password: string) => Promise<UserCredential>;
	loginByGoogle: () => Promise<UserCredential>;
	loginByFacebook: () => Promise<UserCredential>;
	logout: () => Promise<void>;
	setLoading: (value: boolean) => void;
	updateUser: (name: string, photoURL: string) => Promise<void> | undefined;
}

export const AuthContext = createContext({});
const provider = new GoogleAuthProvider();
const FB_Provider = new FacebookAuthProvider();

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(false)

	const createUser = (email: string, password: string) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const login = (email: string, password: string) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const loginByGoogle = () => {
		setLoading(true);
		return signInWithPopup(auth, provider);
	};
	
	const loginByFacebook = ()=> {
		setLoading(true);
		return signInWithPopup(auth,FB_Provider);
	}

	const updateUser = (name: string, photoURL: string) => {
		setLoading(true);
		const currentUser = auth.currentUser;
		if (currentUser) {
			return updateProfile(currentUser, {
				displayName: name,
				photoURL: photoURL,
			});
		}
	};

	const logout = () => {
		setLoading(true);
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				setIsAuthenticated(true);
				setLoading(false);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const authInfo: AuthInfo = {
		user,
		isAuthenticated,
		loading,
		createUser,
		login,
		loginByGoogle,
		logout,
		setLoading,
		updateUser,
		loginByFacebook
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
