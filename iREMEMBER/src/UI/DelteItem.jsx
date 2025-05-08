import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import { FaTimes } from 'react-icons/fa'
import Loader from './Loader';

export default function DelteItem({id}) {
    const queryClient = useQueryClient();

  const {mutate, status} = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries(["items"])
    },
    onError: (error) => {
      console.error("Error:", error);
      toast.error("Item already exist")
    }
  })

  async function postData(){
    const response = await fetch(`http://localhost:3000/api/v1/items/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    return response.json();
  }

  function handleDelete(){
    mutate()
  }
  return <button onClick={handleDelete} className="delete text-xs bg-amber-300 hover:bg-amber-500 text-gray-600 hover:text-gray-700 absolute -right-[10%] top-1 p-1.5 rounded-full">
  {status === "pending" ? <Loader/> : <FaTimes />}
</button>
}
