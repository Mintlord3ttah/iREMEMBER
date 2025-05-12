export async function getItems() {
   try{ 
    const res = await fetch(`http://localhost:3000/api/v1/items/`)
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
    const res = await fetch(`http://localhost:3000/api/v1/items/?sortField=${sortObj.sortField}&sortOrder=${sortObj.sortOrder}`)
    const data = await res.json()
    console.log(data)
    return data.data.items
}catch(error){
    console.log(error.message)
} 
}