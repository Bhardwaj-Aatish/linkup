"use client"
import React from 'react'
import apiClient from '@/lib/axiosInstance'
import { redirect, useRouter } from 'next/navigation'
import AuthForm from '@/components/AuthForm'

interface SigninProps {
  name: String,
  email: String,
  password: String
}
export default function login() {
  const router = useRouter()

  const handleRegisterRedirecting = () => {
    router.push('/register')
  }

  const onSignIn = async ({ name, email, password }: SigninProps) => {
    try {
      const response = await apiClient.post('api/users/signin', {
        name,
        email,
        password
      })
      if (response.status !== 201) {
        throw new Error('Error while login')
      }

      const token = response?.data?.token;
      localStorage.setItem('token', token)
      router.push('/dashboard')
    } catch (e) {
      console.error("not able to signup up", e)
    }
  }

  return (
    <div className="signin-page-container flex flex-col justify-center items-center h-screen w-screen">
      <AuthForm buttonText="Signin" onSubmit={onSignIn} onRouteChange={handleRegisterRedirecting} />
    </div>
  )
}