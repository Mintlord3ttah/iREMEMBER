import { useEffect, useState } from "react";
import Loader from "./Loader";
import Checkbox from "./Checkbox";
import { handleFieldState } from "../utils/utility";
import useMutateData from "../service/useMutateData";

export default function Packed({packed, id}){
    const [isPacked, setIsPacked] = useState(false)
    const {mutate, status} = useMutateData({id, method: "PATCH"})  

    useEffect(()=>setIsPacked(packed),[])
    
      return <span className={`${packed ? "text-green-500" : "text-yellow-500"} flex gap-1 items-center`}>
        {packed ? "packed" : "unpacked"}
        {/* {status === "pending" ? <Loader /> : */}
          <Checkbox status={status} name={"pack"} 
                    handlePacked={()=>handleFieldState(setIsPacked, isPacked, "packed", mutate)} 
                    state={isPacked} />
        {/* } */}
      </span>
  }
