import React from 'react'
import AuthForm from '../UI/AuthForm'
import toast from 'react-hot-toast'
import { getUser } from '../service/getUser'
import { useDataContext } from '../context/DataContext'

export default function Signup() {
  const {getUserId} = useDataContext()

 async function handleSubmit(e){
  e.preventDefault()
    const formData = new FormData(e.target)
    const names = formData.get("names")
    const email = formData.get("email")
    const password = formData.get("password")

    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegEx = /^(?=.*[0-9])(?=.*[\W_])[A-Za-z0-9\W_]{8,}$/
    const validPassword = passwordRegEx.test(password)
    const validEmail = emailRegEx.test(email) && email.includes(".com")

    if(names.length <= 2) return toast.error("name legnth is too short")
    if(!validEmail) return toast.error("Email is invalid")
    if(!validPassword) return toast.error("password must be at least 8 characters long, includes a number and a special character")
    
    const user = {email, name: names, password, redirect: "http://localhost:5173/auth/processing"}
    try{
      const response = await fetch("http://localhost:3000/api/v1/users/", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    const data = await response.json()
    const id = data.data?.id
    const message = data.data?.message
    if(!id) throw new Error("User already exists please sign in")
    toast.success(message)
    getUserId(id)
    console.log({id})
    e.target.reset()
    }catch(error){
      console.log(error.message)
      toast.error(error.message)
    }
  }

  return <div className="h-screen flex justify-center items-center px-4">
    <div className="flex flex-col gap-12">


    <p className="text-3xl font-bold">Signup</p>
  <AuthForm onsubmit={handleSubmit} submitlabel={"Signup"} redirectlabel={"Have an account? Login"} redirectURL={"/Auth/Login"}>
    <label className={`border-b-2 border-amber-700 flex gap-4 items-center px-3`}>
  <span className='font-bold'>Names:</span>
  <input type="text" name='names'  className="w-full bg-transparent outline-none" required />
</label>
  </AuthForm>
  </div>
  </div>
}
