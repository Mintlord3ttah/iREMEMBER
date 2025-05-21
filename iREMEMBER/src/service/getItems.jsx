import toast from "react-hot-toast"

const BACKEND_URL="https://irem-backend.onrender.com/api/v1/items"
// const BACKEND_URL="http://localhost:3000/api/v1/items"

export async function getItems({accessToken, id}) {
    if(!accessToken) return toast.error("Please login to continue")
   try{ 
    const res = await fetch(BACKEND_URL + `?userId=${id}`, {
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

export async function sortItems(sortObj, id){
    // const accessToken = localStorage.getItem("accessToken")
    if(!accessToken) return toast.error("Please login to continue")
    // console.log(sortObj)
    if(!sortObj.sortField) return toast.error("Invalid sort parameters")
   try{ 
    const res = await fetch(`${BACKEND_URL}/?userId=${id}&sortField=${sortObj.sortField}&sortOrder=${sortObj.sortOrder}`, {
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