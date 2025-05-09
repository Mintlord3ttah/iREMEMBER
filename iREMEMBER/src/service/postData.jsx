export default async function postData(id="", method, newData, path=""){
    const url = path.length ? path :
                id.length ? `http://localhost:3000/api/v1/items/${id}`:
                            `http://localhost:3000/api/v1/items/`    

    const response = await fetch(url, {
      method: method,
      body: newData,
      headers: {
        'Content-Type': 'application/json'
      }    
    })

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return method === "DELETE" ? "SUCCESS" : response.json();
  }
