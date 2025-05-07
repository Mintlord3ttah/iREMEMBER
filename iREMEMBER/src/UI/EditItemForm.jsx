import React from 'react'
import Priority from './Priority'
import Favourite from './Favourite'

export default function EditItemForm() {

  return <form className='shadow-md-cstm w-[30rem] h-60 rounded-2xl bg-amber-400 flex flex-col gap-6 py-4'>
    <Input defaultValue={"Tooth brush"} label={"Item"} fontSize={"text-2xl"} />
    <Input defaultValue={"This to brush my teeth every morning"} label={"Purpose"} />
    <Input defaultValue={"3"} label={"Count"} />
    <div className='flex gap-8 items-center px-4'>
    <Priority width={"w-fit"} />
    <label className="flex gap-2 items-center ">
        <Favourite />
        <span>favourite</span>
      </label>
    </div>
  </form>
}

function Input({label, fontSize="text-lg", defaultValue}){
  return <label className={`border-b-2 border-amber-700 flex gap-4 items-center ${fontSize} px-3`}>
  <span className='font-bold'>{label}:</span>
  <input type="text" defaultValue={defaultValue} className="w-full bg-transparent outline-none" />
</label>
}
