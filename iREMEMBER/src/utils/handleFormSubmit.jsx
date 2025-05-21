import toast from "react-hot-toast"

const BACKEND_URL="https://irem-backend.onrender.com/api/v1/users"
// const BACKEND_URL="http://localhost:3000/api/v1/users"

export async function handleFormSubmit(e, placeholder=""){
  // console.log({placeholder})
  e.preventDefault()
    const formData = new FormData(e.target)
    const names = formData.get("names")
    const email = formData.get("email")
    const password = formData.get("password")

    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegEx = /^(?=.*[0-9])(?=.*[\W_])[A-Za-z0-9\W_]{8,}$/
    const validPassword = passwordRegEx.test(password)
    const validEmail = emailRegEx.test(email) && email.includes(".com")

    console.log({name: names, length: names?.length, if: !placeholder, placeholder})
    if(names?.length < 3 || placeholder) return toast.error("name length is too short")
    if(!validEmail) return toast.error("Email is invalid")
    if(!validPassword) return toast.error("password must be at least 8 characters long, includes a number and a special character")
    
    const user = {email, name: names, password, redirect: "https://iremember-eight.vercel.app/auth/processing"}
    try{
      const response = await fetch(`${BACKEND_URL}/${placeholder}`, {
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
    console.log(data)
    e.target.reset()
    return data?.data
    }catch(error){
      console.log(error.message)
      if(error.message.includes("buffering timed out")) return toast.error("Server is busy, please try again later")
      if(error.message.includes("NetworkError")) return toast.error("Network Error, please check your connection")
      toast.error(error.message)
    }
  }