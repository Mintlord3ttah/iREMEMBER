import React from 'react'

export default function ProcessUI() {
  return <div className="flex flex-col gap-4 justify-center items-center h-screen">
     <p>Please Wait while we process your data</p>
     <div className='gen-loader mt-12'></div>
     <p className="text-2xl font-bold">Loading...</p>
   </div>
}
