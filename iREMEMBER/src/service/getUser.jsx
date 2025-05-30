import toast from "react-hot-toast"
import { BACKEND_URL } from "../utils/backendSite"

export async function getUser(filter) {
    // const navigate = useNavigate()
    if(!filter) return toast.error("No filter provided")
    try{ 
    const res = await fetch(`${BACKEND_URL}/users/${filter}`,{
            method: "GET",
            credentials: "include" // Sends HttpOnly cookie automatically
        })
    const data = await res.json()
    if(!data.data.user?.accessToken){
        localStorage.removeItem("accessToken");
        window.location.href = "/auth/login"

        throw new Error("Session expired, please login again");
        }
    return data.data.user
}catch(error){
    // console.log(error.message)
}
}

export async function refreshAccessToken() {

    try{
        const response = await fetch(BACKEND_URL +"/users/refresh-token", {
            method: "POST",
            credentials: "include" // Sends HttpOnly cookie automatically
        });
        if (!response.ok) throw new Error("Failed to refresh");
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);

    }catch(error){
        // console.log(error.message)
        toast.error(error.message)
    }
    return true
}
