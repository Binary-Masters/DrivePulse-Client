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
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
// import { FacebookAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
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
  sendPassResetEmail:any;
  credential: any;
  logout: () => Promise<void>;
  setLoading: (value: boolean) => void;
  updateUser: (name: string, photoURL: string) => Promise<void> | undefined;
}

export const AuthContext = createContext({});
// export const AuthContext = createContext<AuthInfo>({} as AuthInfo);

// const FB_Provider = new FacebookAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const createUser = async (email: string, password: string): Promise<UserCredential> => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
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
  
    const cred = EmailAuthProvider.credential(user.email || "", pass);  // Ensure user.email is not null
    try {
      await reauthenticateWithCredential(user, cred);
    } catch (error) {
      console.error("Reauthentication error:", error);
      // Handle the error, depending on your use case
      return null;
    }
  };

  // update password
  const updateUserPassword = async (newPass: string): Promise<void | null> => {
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
  const sendPassResetEmail=async(email:string):Promise<void | null>=>{
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error(error);
      // Handle the error, depending on your use case
      return null;
    } 
  }

  // const loginByFacebook = () => {
  //   const FB_Provider = new FacebookAuthProvider();
  //   setLoading(true);
  //   return signInWithPopup(auth, FB_Provider);
  // };

  //Github Authentication
  const loginByGithub = ()=>{
    setLoading(true);
    return signInWithPopup(auth,githubProvider);
  }
  
  const resetPassword = async (email:string) => {
    return sendPasswordResetEmail(auth, email);
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
    sendPassResetEmail
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
