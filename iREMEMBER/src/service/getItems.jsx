export async function getItems() {
    const res = await fetch("http://localhost:3000/api/v1/items")
    const data = await res.json()
    return data.data.items
}