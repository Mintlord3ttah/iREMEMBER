import toast from "react-hot-toast"
const BACKEND_URL="http://localhost:3000/api/v1/users"

export async function getUser(id) {
   try{ 
    const res = await fetch(`${BACKEND_URL}/${id}`)
    const data = await res.json()
    return data.data.users
}catch(error){
    console.log(error.message)
}
}

export async function refreshAccessToken() {
    try{
        const response = await fetch(BACKEND_URL +"/refresh-token", {
            method: "POST",
            credentials: "include" // Sends HttpOnly cookie automatically
        });
        const data = await response.json();
        // getAccessToken(data.accessToken)
        localStorage.setItem("accessToken", data.accessToken); // Store new access token
    }catch(error){
        toast.error(error.message)
        window.location.href = "/Auth/Signup"
    }
    return true
}
