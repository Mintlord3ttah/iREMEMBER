const BACKEND_URL="https://irem-backend.onrender.com/api/v1/items"

export async function getItems() {
   try{ 
    const res = await fetch(BACKEND_URL)
    const data = await res.json()
    return data.data.items
}catch(error){
    console.log(error.message)
}
}

export async function sortItems(sortObj){
    // console.log(sortObj)
    if(!sortObj.sortField) return
   try{ 
    const res = await fetch(`${BACKEND_URL}/?sortField=${sortObj.sortField}&sortOrder=${sortObj.sortOrder}`)
    const data = await res.json()
    console.log(data)
    return data.data.items
}catch(error){
    console.log(error.message)
} 
}