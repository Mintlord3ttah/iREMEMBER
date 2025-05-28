export function padStartNumber(length, number){
    if(typeof length !== "number" && typeof number !== "number") return null
    return `${number}`.padStart(length, "0")
}