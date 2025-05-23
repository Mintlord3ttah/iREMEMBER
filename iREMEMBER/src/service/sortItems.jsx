import { BACKEND_URL } from "../utils/backendSite"

export async function sortItems({sortObj, id}){
    console.log({sortObj})
    const accessToken = localStorage.getItem("accessToken")
    if(!accessToken) return toast.error("Please login to continue")
    if(!sortObj.sortField) return toast.error("Invalid sort parameters")
   try{ 
    const res = await fetch(`${BACKEND_URL}/items/sort?userId=${id}&sortField=${sortObj.sortField}&sortOrder=${sortObj.sortOrder}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        credentials: "include"
    })
    const data = await res.json()
    console.log(data)
    return data.data.items
}catch(error){
    console.log(error.message)
    toast.error(error.message)
}
}