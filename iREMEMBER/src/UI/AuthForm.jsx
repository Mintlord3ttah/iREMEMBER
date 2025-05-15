import React from 'react'
import { redirect, useNavigate } from 'react-router-dom'

export default function AuthForm({children, submitlabel, onsubmit, createAcc, redirectlabel, redirectURL}) {
    const navigate = useNavigate()
  return <form onSubmit={onsubmit} className="flex flex-col gap-6">
        {children}
        <label className={`border-b-2 border-amber-700 flex gap-4 items-center px-3`}>
  <span className='font-bold'>Email:</span>
  <input type="email" name='email'  className="w-full bg-transparent outline-none" required />
</label>
        <label className={`border-b-2 border-amber-700 flex gap-4 items-center px-3`}>
  <span className='font-bold'>Password:</span>
  <input type="password" name='password'  className="w-full bg-transparent outline-none" required />
</label>
<div className="flex justify-between items-center">
        <input type="submit" value={submitlabel} className="p-3 border cursor-pointer hover:bg-amber-500 bg-amber-400 rounded-2xl" />
        <span onClick={()=>navigate(redirectURL)} className="text-blue-700 hover:bg-blue-200 px-4 rounded-sm cursor-pointer">{redirectlabel}</span>
</div>
<p onClick={()=>navigate("/Auth/Signup")} className="text-blue-700 w-fit hover:bg-blue-200 px-4 rounded-sm cursor-pointer">
{createAcc}
</p>
    </form>
}
