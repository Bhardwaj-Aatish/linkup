"use client"
import { useState } from "react"
import Button from "./Button";
import FormField from "./FormField";

interface authformProps {
  buttonText?: string,
  onSubmit?: any;
  onRouteChange?: () => void;
}
const AuthForm: any = ({ buttonText, onSubmit, onRouteChange}: authformProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    onSubmit(({name, email, password}));
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="form-container flex flex-col justify-center items-center w-130  p-8 bg-bg-secondary border-2 border-transparent rounded-2xl shadow-lg">
      <h1 className="text-accent-primary text-4xl mb-2">LinkUp</h1>
      <span className="mb-6 text-base text-text-secondary">Connect, share and grow </span>
      <form onSubmit={handleSubmit} autoComplete="off" className=" space-y-5 w-8/10" noValidate>
        <FormField label="Name"  inputType="text" placeholder="Enter you name" onChange={(event: any) => setName(event?.target.value)} inputValue={name}/>
        <FormField label="Email address" inputType="email" placeholder="aatish@gmail.com" inputAutocomplete="new-email" inputValue={email} onChange={(event: any) => setEmail(event.target.value)}/>
        <FormField label="Password" inputType="password" placeholder="Enter your password" inputValue={password} onChange={(event: any) => setPassword(event.target.value)} />
        <div className="label-value flex flex-col text-xl text-mybackground py-5">
            <Button type="submit" text={buttonText as string} /> 
        </div>
        <div className="flex flex-row items-center justify-center test-xs space-x-2">
              <span className="text-text-secondary">{buttonText === "Signin" ? 'Dont have an account?' : 'Already have a account?'}</span>
              <Button text={buttonText === 'Signin' ? 'SignUp' : 'Signin'} buttonType={"tertiary"} onClick={onRouteChange}/>
        </div>
      </form>
    </div>
  )
}

export default AuthForm