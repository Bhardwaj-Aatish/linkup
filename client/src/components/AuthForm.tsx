"use client"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
const AuthForm: any = ({ buttonText, onSubmit}: any) => {
  const [name, setName] = useState('random');
  const [email, setEmail] = useState('abc@gmail.com')
  const [password, setPassword] = useState('lasjfad');

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log("working here", name, email, password);
    onSubmit(({name, email, password}));
    setName('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className="form-container flex flex-col justify-center items-center w-140 px-5 py-8 bg-mycyan border-2 border-myslate color rounded-lg shadow-xl shadow-gray-800/100">
      <Image src="/linkup-logo.svg" alt='Linkup' width={100} height={80} />
      <form onSubmit={handleSubmit} autoComplete="off" className="w-8/10" noValidate>
        <div className="label-value flex flex-col pb-5 text-mystone">
          <label htmlFor="name" className="mb-1"> Name </label>
          <input type="text" id="name" className="bg-myteal p-2 border-2 rounded-md border-myslate outline-none focus:ring-2 focus:ring-mystone" onChange={(event) => setName(event?.target.value)} value={name} />
        </div>

        <div className="label-value flex flex-col pb-5 text-mystone">
          <label htmlFor="email" className="mb-1"> Email address </label>
          <input type="email" id="email" name="email" autoComplete="new-email" value={email} onChange={(event) => setEmail(event.target.value)} className="bg-myteal p-2 border-2 rounded-md border-myslate outline-none focus:ring-2 focus:ring-mystone" />
        </div>

        <div className="label-value flex flex-col pb-5 text-mystone">
          <label htmlFor="password" className="mb-1"> Password</label>
          <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)} className="bg-myteal border-myslate p-2 border-2 rounded-md outline-none focus:ring-2 focus:ring-mystone" />
        </div>

        <div className="label-value flex flex-col pt-5">
          <button type="submit" className="bg-myslate text-mystone hover:bg-myteal hover:border-mystone border border-myslate rounded-md p-3 cursor-pointer hover:shadow-sm hover:shadow-mystone"> {buttonText}</button>
        </div>
      </form>
    </div>
  )
}

export default AuthForm