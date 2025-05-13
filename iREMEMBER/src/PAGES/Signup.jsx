import React from 'react'
import AuthForm from '../UI/AuthForm'

export default function Signup() {
  return <div className="h-screen flex justify-center items-center">
    
  <AuthForm submitlabel={"Signup"} redirectlabel={"Have an account? Login"} redirectURL={"/Auth/Login"}>
    <label className={`border-b-2 border-amber-700 flex gap-4 items-center px-3`}>
  <span className='font-bold'>Names:</span>
  <input type="text"  className="w-full bg-transparent outline-none" />
</label>
  </AuthForm>
  </div>
}
