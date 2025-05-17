import toast from "react-hot-toast"

export async function handleFormSubmit(e, placehoder=""){
  e.preventDefault()
    const formData = new FormData(e.target)
    const names = formData.get("names")
    const email = formData.get("email")
    const password = formData.get("password")

    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegEx = /^(?=.*[0-9])(?=.*[\W_])[A-Za-z0-9\W_]{8,}$/
    const validPassword = passwordRegEx.test(password)
    const validEmail = emailRegEx.test(email) && email.includes(".com")

    if(names?.length <= 2 || !placehoder) return toast.error("name legnth is too short")
    if(!validEmail) return toast.error("Email is invalid")
    if(!validPassword) return toast.error("password must be at least 8 characters long, includes a number and a special character")
    
    const user = {email, name: names, password, redirect: "http://localhost:5173/auth/processing"}
    try{
      const response = await fetch(`http://localhost:3000/api/v1/users/${placehoder}`, {
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
    console.log(data)
    e.target.reset()
    return data?.data
    }catch(error){
      console.log(error.message)
      toast.error(error.message)
    }
  }