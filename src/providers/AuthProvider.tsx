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
import { auth } from "../firebase/firebase.config";
export interface AuthInfo {
	user: any;
	loading: boolean;
	createUser: (email: string, password: string) => Promise<UserCredential>;
	login: (email: string, password: string) => Promise<UserCredential>;
	loginByGoogle: () => Promise<UserCredential>;
	logout: () => Promise<void>;
	setLoading: (value: boolean) => void;
	updateUser: (name: string, photoURL: string) => Promise<void> | undefined;
}

export const AuthContext = createContext({});

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	const createUser = (email: string, password: string) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};

	const login = (email: string, password: string) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const loginByGoogle = () => {
		const provider = new GoogleAuthProvider();
		setLoading(true);
		return signInWithPopup(auth, provider);
	};

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
				setLoading(false);
			}
		});

		return () => {
			unsubscribe();
		};
	}, []);

	const authInfo: AuthInfo = {
		user,
		loading,
		createUser,
		login,
		loginByGoogle,
		logout,
		setLoading,
		updateUser,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
