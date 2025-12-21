"use client"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"
import { AuthContext, User } from "@/context/AuthContext";

type jwtDecode = {
    id: string,
    iat: string
}

export default function ProtectedLayout({children}: Readonly<{children: React.ReactNode;}>) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<User| null>(null);
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            router.push('/login')
        }
        const {id} = jwtDecode<jwtDecode>(token as string)
        setUser({id})
    }, [router, pathname])

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
  }