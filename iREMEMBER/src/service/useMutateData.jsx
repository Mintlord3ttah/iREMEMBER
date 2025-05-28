import { useMutation, useQueryClient } from "@tanstack/react-query";
import postData from "./postData";
import { useDataContext } from "../context/DataContext";

export default function useMutateData({id="", method, url=""}){
  const {getAllItems, accessToken, getNotifications} = useDataContext()
    const queryClient = useQueryClient()

    const {mutate, status, isPending} = useMutation({
      mutationFn: async (data)=>{
        return await postData(id, method, accessToken, data, url)
      },
        onSuccess: (data) => {
          if(!data) return // toast.error("Conection Error")
            url.includes("notifications") ? queryClient.invalidateQueries(["notifications"]) : queryClient.invalidateQueries(["items"])
            queryClient.setQueryData(["items"], (oldData) => {
              const newData = data.data.items 
              const newNotification = data.data.notification
              // const oldItems = oldData?.data.items
              newData ? getAllItems(newData) : getNotifications(newNotification)
            })
            console.log(data);
          },
          
          onError: (error) => {
            console.error("Error:", error);
          }    
        })

    return {mutate, status, isPending}
}