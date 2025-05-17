import toast from "react-hot-toast";

const BACKEND_URL="https://irem-backend.onrender.com/api/v1/items"

export default async function postData(id="", method, token, newData, path=""){
  console.log({id, method, token, newData, path})
    if(!token) return
    try{const url = path.length ? path :
                id.length ? `${BACKEND_URL}/${id}`:
                            `${BACKEND_URL}/`    

    const response = await fetch(url, {
      method: method,
      body: newData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }    
    })
    if(!response.ok) throw new Error("Something went wrong")
    if(method === "DELETE" && response.status === 204) return "SUCCESS"
    // console.log({response: await response.json()})
    return response.json();
}catch(error){
    console.error(error.message)
    toast.error(error.message)
}
  }
