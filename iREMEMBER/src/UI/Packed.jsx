import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function Packed({packed, id}){
    const [isPacked, setIsPacked] = useState(false)
    const queryClient = useQueryClient()

    const {mutate, status} = useMutation({
        mutationFn: postData,
        onSuccess: (data) => {
            queryClient.invalidateQueries(["items"])
            console.log(data);
          },
          onError: (error) => {
            console.error("Error:", error);
          }    
        })
    async function postData(newData){
        const response = await fetch(`http://localhost:3000/api/v1/items/${id}`, {
          method: "PATCH",
          body: newData,
          headers: {
            'Content-Type': 'application/json'
          }    
        })
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      
        return response.json();
      }

      function handlePacked(){
        try{
          setIsPacked(packed => !packed)
          const changePacked = isPacked ? false : true
          const obj = JSON.stringify({packed: changePacked})
          mutate(obj)
        }catch(error){
          console.log(error.type)
      }
    }
  
    useEffect(()=>setIsPacked(packed),[])
    // useEffect(()=>setLoading(status === "pending" ? true : status === "success" ? false : false),[status])
    // return 
    
      return <span className={`${packed ? "text-green-500" : "text-yellow-500"} flex gap-1 items-center`}>
        {packed ? "packed" : "unpacked"}
        {status === "pending" ? <Loader /> :
          <input type="checkbox" onChange={handlePacked} checked={isPacked} name="pack" id="pack" />
        }
      </span>
  }
