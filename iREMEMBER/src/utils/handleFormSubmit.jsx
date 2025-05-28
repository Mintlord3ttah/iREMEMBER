import toast from "react-hot-toast"
import { BACKEND_URL } from "./backendSite"

const FRONTEND_URL="https://iremember-eta.vercel.app/auth/processing"
// const FRONTEND_URL="http://localhost:5173/auth/processing"

export async function handleFormSubmit(e, placeholder=""){
  e.preventDefault()
    const formData = new FormData(e.target)
    const names = formData.get("names")
    const email = formData.get("email")
    const password = formData.get("password")

    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegEx = /^(?=.*[0-9])(?=.*[\W_])[A-Za-z0-9\W_]{8,}$/
    const validPassword = passwordRegEx.test(password)
    const validEmail = emailRegEx.test(email) && email.includes(".com")

    if(names?.length < 3 && placeholder) return toast.error("name length is too short")
    if(!validEmail) return toast.error("Email is invalid")
    if(!validPassword) return toast.error("password must be at least 8 characters long, includes a number and a special character")
    
    const user = {email, name: names, password, redirect: FRONTEND_URL}
    try{
      const response = await fetch(`${BACKEND_URL}/users/${placeholder}`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    const data = await response.json()
    const message = data.data?.message
    const status = data?.status
    if(status === "fail") throw new Error(data?.message)  
    toast.success(message)
    e.target.reset()
    return data?.data
    }catch(error){
      if(error.message.includes("buffering timed out")) return toast.error("Server is busy, please try again later")
      if(error.message.includes("NetworkError")) return toast.error("Network Error, please check your connection")
      toast.error(error.message)
    }
  }