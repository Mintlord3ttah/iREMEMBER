const BACKEND_URL="http://localhost:3000/api/v1/users"

export async function getUser(id) {
   try{ 
    const res = await fetch(`${BACKEND_URL}/${id}`)
    const data = await res.json()
    return data.data.items
}catch(error){
    console.log(error.message)
}
}