import React, { useEffect, useState } from 'react'
import Priority from './Priority'
import Favourite from './Favourite'
import { useDataContext } from '../context/DataContext'
import Packed from './Packed'
import useMutateData from '../service/useMutateData'

export default function EditItemForm() {
  const {itemToEdit, isFavourite, setIsFavourite, resetIsFavourite, edit, itemStatus, getItemStatus} = useDataContext()
  const {mutate, isPending, status} = useMutateData({method: "PATCH", id: itemToEdit._id})

  function handleSubmit(e){
    e.preventDefault()

    const formData = new FormData(e.target)
    const item = formData.get("item")
    const purpose = formData.get("purpose")
    const count = formData.get("count") || 1
    const packed = formData.get("pack") === "on" ? true : false
    const priority = formData.get("priority").includes("priority:") ? "normal" : formData.get("priority") 
    const obj = JSON.stringify({item, purpose, count, packed, priority, favourite: isFavourite})

    mutate(obj)
    resetIsFavourite()
    e.target.reset()
    edit()
  }

  useEffect(()=>setIsFavourite(itemToEdit.favourite ? "1" : "0"),[])
  useEffect(()=>getItemStatus(status),[status])

  return <form onSubmit={handleSubmit} className='shadow-md-cstm w-[30rem] h-60 rounded-2xl bg-amber-400 flex flex-col gap-6 py-4'>
    <Input defaultValue={itemToEdit.item} label={"Item"} fontSize={"text-2xl"} />
    <Input defaultValue={itemToEdit.purpose} label={"Purpose"} />
    <Input defaultValue={itemToEdit.count} label={"Count"} extra={<Packed packed={itemToEdit.packed} id={itemToEdit._id} />} />
    <div className='flex gap-8 items-center px-4'>
    <Priority defaultValue={itemToEdit.priority} width={"w-fit"} />
    <label className="flex gap-2 items-center ">
        <Favourite />
        <span>favourite</span>
      </label>
      <div className='grow-1 flex justify-end'>
      <input type="submit" value="Update" className="w-fit justify-self-end bg-amber-500 rounded-2xl p-2 cursor-pointer hover:bg-amber-600" />
      </div>
    </div>
  </form>
}

function Input({label, fontSize="text-lg", defaultValue, extra}){
  return <label className={`border-b-2 border-amber-700 flex gap-4 items-center ${fontSize} px-3`}>
  <span className='font-bold'>{label}:</span>
  <input type="text" name={label.toLowerCase()} defaultValue={defaultValue} className="w-full bg-transparent outline-none" />
  {extra}
</label>
}
