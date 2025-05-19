import { useMutation, useQueryClient } from "@tanstack/react-query";
import postData from "./postData";
import { useDataContext } from "../context/DataContext";
import toast from "react-hot-toast";


export default function useMutateData({id="", method, url=""}){
  const {getAllItems, accessToken, currentUser} = useDataContext()
    const queryClient = useQueryClient()

    const {mutate, status, isPending} = useMutation({
      mutationFn: async (data)=>{
        console.log({data})
        return await postData(id, method, accessToken, data, url)
      },
        onSuccess: (data) => {
          if(!data) return toast.error("Conection Error")
            queryClient.invalidateQueries(["items"])
            console.log(data)
            getAllItems(data?.data.items)
            
            console.log(data);
          },
          onError: (error) => {
            console.error("Error:", error);
          }    
        })
    
    return {mutate, status, isPending}
}