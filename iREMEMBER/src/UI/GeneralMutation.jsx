import { memo, useEffect, useState } from "react"
import useMutateData from "../service/useMutateData"
import { useDataContext } from "../context/DataContext"

const endpoints = {
    "pack-all": "packed",
    "unpack-all": "-packed",
    "favourite-all": "favourite",
    "unfavourite-all": "-favourite",
    "delete-all": "wipe",
    "wipe-not-priority": "expacked",
    "wipe-not-priority": "expriority",
    "wipe-not-favourite": "exfavourite",
    "wipe-not-priority|favourite": "expriority,exfavourite"
}
// const path = "http://localhost:3000/api/v1/items"
const path = "https://irem-backend.onrender.com/api/v1/items"

const GeneralMutation = memo(function GeneralMutation() {
    const {isSelect, select} = useDataContext()
    const [endpoint, setEndpoint] = useState("")
    const {mutate, status} = endpoint.includes("delete") ? useMutateData({method: "DELETE", url: `${path}/db/${endpoints[endpoint]}`}) :
                     useMutateData({method: endpoint.includes("wipe") ? "DELETE" : "PATCH", url: `${path}/uniform/${endpoints[endpoint]}`})

    function handleClick(e){
        if(e.target.value === "Gen.Mutation") return
        setEndpoint(e.target.value)
        if(isSelect) select()
    }

    useEffect(()=>{endpoint.length && mutate(JSON.stringify({select: "null"}))},[endpoint]) // fake data to occupy the vaccum
    useEffect(()=>getItemStatus(status),[status])

    return <select onChange={handleClick} defaultValue={"Gen.Mutation"} name="mutation" className="w-fit bg-amber-100 rounded-sm h-8 px-2" placeholder="Priority">
        <option className="font-bold" value={"Gen.Mutation"}>Gen.Mutation</option>
        <option value="pack-all">Pack all</option>
        <option value="unpack-all">Unpack all</option>
        <option value="favourite-all" >Favourite all</option>
        <option value="unfavourite-all" >Unfavourite all </option>
        <option value="delete-all" >Delete all</option>
        <option disabled={isSelect} className={`${isSelect ? "text-gray-400" : ""}`}  value="wipe-not-packed">Delete all not packed (pa)</option>
        <option disabled={isSelect} className={`${isSelect ? "text-gray-400" : ""}`}  value="wipe-not-priority">Delete all not priority (pr)</option>
        <option disabled={isSelect} className={`${isSelect ? "text-gray-400" : ""}`} value="wipe-not-favourite">Delete all not favourite (fa)</option>
        <option disabled={isSelect} className={`${isSelect ? "text-gray-400" : ""}`} value="wipe-not-priority|favourite">Delete all not (pr) and (fa)</option>
    </select>
})

export default GeneralMutation
