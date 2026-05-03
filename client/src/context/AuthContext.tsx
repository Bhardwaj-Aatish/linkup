"use client"

import { createContext, useContext } from "react"

export type User = {
    id : string
}

export type AuthContextType = {
    user: User | null;
}

export const AuthContext = createContext<AuthContextType | null> (null);

export const useAuth = () : AuthContextType => {
    const ctx =  useContext(AuthContext);
    if(!ctx) {
        throw new Error ("userAuth must be inside AuthContext.Provider")
    }
    return ctx;
}