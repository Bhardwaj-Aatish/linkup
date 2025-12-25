"use client"
import AuthForm from "@/components/AuthForm"
import apiClient from "@/lib/axiosInstance"
import axios from "axios"
import { useRouter } from "next/navigation"

interface SignUpProps {
	name: string,
	email: string,
	password: string
}

export default function Register() {
	const router = useRouter()

	const handleRegisterRedirecting = () => {
		router.push('/login')
	}

	const onSignUp = async ({ name, email, password }: SignUpProps) => {
		try {
			const response = await apiClient.post('/api/users/signup', {
				name,
				email,
				password
			  })

			if (response.status !== 201) {
				throw new Error("Error in signup")
			}
			router.push('/login')

		} catch (e) {
			console.error("error message", e)
		}

	}

	return (
		<div className="signup-page-container  flex flex-col justify-center items-center h-screen w-screen">
			<AuthForm buttonText='Register' onSubmit={onSignUp} onRouteChange={handleRegisterRedirecting} />
		</div>
	)
}