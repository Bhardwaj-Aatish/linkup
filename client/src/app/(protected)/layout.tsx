"use client"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode"
import { AuthContext, User } from "@/context/AuthContext";
import apiClient, { setAccessToken } from "@/lib/axiosInstance";

type jwtDecode = {
    userId: string,
    iat: string
}

export default function ProtectedLayout({children}: Readonly<{children: React.ReactNode;}>) {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<User| null>(null);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await apiClient.post('/api/users/refresh');
                const accessToken = response.data.accessToken;
                setAccessToken(accessToken);
    
                const {userId} = jwtDecode(accessToken) as jwtDecode;
                setUser({id: userId});
            } catch {
                router.push('/login')
            }
        }
        checkAuth();
    }, [])

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
  }