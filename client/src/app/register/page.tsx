"use client"
import AuthForm from "../../components/AuthForm"
import axios from "axios"
import {useRouter} from "next/navigation"

interface SignUpProps {
	name: String,
	email: String,
	password: String
}

export default function Register () {
	const router = useRouter()

		const onSignUp = async ({name, email, password}: SignUpProps) => {
			try {
				const response = await axios.post('http://localhost:3001/api/users/signup', {
					name,
					email,
					password
				})
				
				if(response.status !== 201) {
					throw new Error("Error in signup")
				}
				router.push('/login')
				
			} catch (e) {
				console.error("error message", e)
			}

		}

    return (
      <div className="signup-page-container  flex flex-col justify-center items-center h-screen w-screen">
				<AuthForm buttonText='Register' onSubmit={onSignUp}/>
			</div>
    )
}