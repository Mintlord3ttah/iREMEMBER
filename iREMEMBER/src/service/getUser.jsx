import toast from "react-hot-toast"
const BACKEND_URL="https://irem-backend.onrender.com/api/v1/users"
// const BACKEND_URL="http://localhost:3000/api/v1/users"


export async function getUser(filter) {
    if(!filter) return toast.error("No filter provided")
    try{ 
    const res = await fetch(`${BACKEND_URL}/${filter}`,{
            method: "GET",
            credentials: "include" // Sends HttpOnly cookie automatically
        })
    const data = await res.json()
    // console.log(data)
    return data.data.user
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
        if (!response.ok) throw new Error("Failed to refresh");
        const data = await response.json();
        console.log({data})
        localStorage.setItem("accessToken", data.accessToken);
        // localStorage.setItem("joker", data.accessToken);

    }catch(error){
        console.log(error.message)
        toast.error(error.message)
        //window.location.href = "/Auth/Signup"
    }
    return true
}
