import React from 'react'

export default function EditItemForm() {
  return <form className='shadow-md-cstm w-[30rem] h-60 rounded-2xl bg-amber-400 flex flex-col gap-6 py-4'>
    <input type="text" defaultValue={"Tooth brush"} className="w-full px-3 text-2xl bg-transparent border-b-2 border-amber-700 outline-none" />
    <input type="text" defaultValue={"purpose: This to brush my teeth every morning"} className="w-full px-3 text-lg bg-transparent border-b-2 border-amber-700 outline-none" />
    <input type="text" defaultValue={"Count: 3"} className="w-full px-3 text-lg bg-transparent border-b-2 border-amber-700 outline-none" />
    <div className='flex gap-8 items-center px-4'>
    <label htmlFor="select" className="flex gap-2 ">
        <input type="checkbox" name="select" id="select" />
        <span>prioritize</span>
        </label>
    <label htmlFor="select" className="flex gap-2 ">
        <input type="checkbox" name="select" id="select" />
        <span>favourite</span>
        </label>
    </div>
  </form>
}
