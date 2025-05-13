import toast from "react-hot-toast";

const BACKEND_URL="https://irem-backend.onrender.com/api/v1/items"

export default async function postData(id="", method, newData, path=""){
    try{const url = path.length ? path :
                id.length ? `${BACKEND_URL}/${id}`:
                            `${BACKEND_URL}/`    

    const response = await fetch(url, {
      method: method,
      body: newData,
      headers: {
        'Content-Type': 'application/json'
      }    
    })

    return method === "DELETE" ? "SUCCESS" : response.json();
}catch(error){
    console.log(error.message)
    toast.error(error.message)
}
  }
