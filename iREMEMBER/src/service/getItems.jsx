import toast from "react-hot-toast"
import { BACKEND_URL } from "../utils/backendSite"

export async function getItems({accessToken, id}) {
    if(!accessToken) return toast.error("Please login to continue")
   try{ 
    const res = await fetch(BACKEND_URL + `/items?userId=${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        credentials: "include"
    })
    const data = await res.json()
    if(data.message) throw new Error("Connection Error")
    return data.data?.items
}catch(error){
    console.log(error.message)
    toast.error(error.message)
}
}
