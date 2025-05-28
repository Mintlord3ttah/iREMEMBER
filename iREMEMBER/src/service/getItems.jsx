import toast from "react-hot-toast"
import { BACKEND_URL } from "../utils/backendSite"

export async function getItems({accessToken, id, url=""}) {
    const path = url || `/items?userId=${id}`
    console.log({accessToken,url})
    if(!accessToken) return toast.error("Please login to continue")
   try{ 
    const res = await fetch(BACKEND_URL + path, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        credentials: "include"
    })
    const data = await res.json()
    console.log(data)
    if(data.message) throw new Error("Connection Error")
    return url.length ? data.data.notifications : data.data?.items
}catch(error){
    console.log(error.message)
    toast.error(error.message)
}
}
