import { useMutation, useQueryClient } from "@tanstack/react-query";
import postData from "./postData";

export default function useMutateData({id="", method, url=""}){
    const queryClient = useQueryClient()

    const {mutate, status} = useMutation({
        mutationFn: (data)=>postData(id, method, data, url),
        onSuccess: (data) => {
            queryClient.invalidateQueries(["items"])
            console.log(data);
          },
          onError: (error) => {
            console.error("Error:", error);
          }    
        })
    
    return {mutate, status}
}