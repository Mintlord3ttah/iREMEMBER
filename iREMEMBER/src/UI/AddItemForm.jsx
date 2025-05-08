import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Favourite from "./Favourite";
import Priority from "./Priority";
import { useState } from "react";
import { useDataContext } from "../context/DataContext";

export default function AddItemForm() {
  const {resetIsFavourite, isFavourite} = useDataContext()
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postData,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["items"])
      console.log("Server response:", data);
    },
    onError: (error) => {
      console.error("Error:", error);
    }
  })

  async function postData(newData){
    const response = await fetch("http://localhost:3000/api/v1/items/", {
      method: "POST",
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
  async function handleSubmit(e){
    e.preventDefault()

    const formData = new FormData(e.target)
    const item = formData.get("item")
    const purpose = formData.get("purpose")
    const count = formData.get("count") || 1
    const packed = formData.get("pack") === "on" ? true : false
    const priority = formData.get("priority").includes("priority:") ? "normal" : formData.get("priority") 
    const obj = JSON.stringify({item, purpose, count, packed, priority, createdById: 1, favourite: isFavourite})

    mutation.mutate(obj)
    resetIsFavourite()
    e.target.reset = true
  }



  return(<form onSubmit={handleSubmit} className="bg-amber-300 gap-3 h-full rounded-2xl border p-4 flex flex-col grow-1 justify-between" >
  <div className="flex justify-between items-center"><span>New Item</span> <Favourite /></div>
  <input type="text" className="w-full bg-amber-100 rounded-sm h-8 px-2" name="item"  placeholder="Item Name" required/>
  <input type="text" className="w-full bg-amber-100 rounded-sm h-8 px-2" name="purpose" placeholder="Purpose"/>
  <input type="number" max={50} min={1} className="w-full bg-amber-100 rounded-sm h-8 px-2" name="count" placeholder="Count"/>
  <Priority width={"w-full"} />
  <div className="flex w-full justify-between items-center">
  <label htmlFor="pack" className="flex gap-3">
    <input type="checkbox" id="pack" name="pack"/>
    <span className="text-sm">Mark as packed</span>
  </label>
  <input type="submit" value="Save" className="w-fit bg-amber-500 rounded-2xl p-2 cursor-pointer hover:bg-amber-600"/>
  </div>
</form>)
}
