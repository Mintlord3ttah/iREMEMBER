import toast from "react-hot-toast";

export default async function postData(id="", method, newData, path=""){
    try{const url = path.length ? path :
                id.length ? `http://localhost:3000/api/v1/items/${id}`:
                            `http://localhost:3000/api/v1/items/`    

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
