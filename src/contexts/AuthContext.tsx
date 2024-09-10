'use client'

import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User, GoogleAuthProvider, signInWithPopup, getAdditionalUserInfo } from "@firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { auth } from "@/lib/firebase";

interface AuthContextType {
    user: User | null
    loading: boolean
    signIn: (email: string, password: string) => Promise<void>
    signUp: (email: string, password: string) => Promise<void>
    googleSignIn: () => Promise<void>
    googleSignUp: () => Promise<void>
    logOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("Auth state changed:", user ? `User logged in: ${user.uid}` : "No user");
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signIn = async (email: string, password: string) => {
        await signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
    }

    const signUp = async (email: string, password: string) => {
        await createUserWithEmailAndPassword(auth, email, password);
    }

    const googleSignUp = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);

        const additionalUserInfo = getAdditionalUserInfo(result);

        if (result.user && additionalUserInfo?.isNewUser) {
            console.log("New user signed up with Google:");
        } else {
            console.log("Existing user signed in with Google");
        }
    }

    const logOut = async () => {
        await signOut(auth);
    }

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, logOut, googleSignIn, googleSignUp }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context;
}
