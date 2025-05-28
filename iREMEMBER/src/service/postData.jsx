import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/backendSite";

export default async function postData(id="", method, token, newData, path=""){
    if(!token) return
    try{const url = path.length ? BACKEND_URL + path :
                id.length ? `${BACKEND_URL}/items/item?itemId=${id}`:
                            `${BACKEND_URL}/items`

    const response = await fetch(url, {
      method: method,
      body: newData,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }    
    })
    if(!response.ok){
      const error = await response.json()
      throw new Error(error.message)
    } 
    if(method === "DELETE" && response.status === 204) return "SUCCESS"
    return response.json();
}catch(error){
    console.error(error.message)
    toast.error(error.message)
}
  }
