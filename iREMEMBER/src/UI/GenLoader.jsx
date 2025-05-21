import React from 'react'

export default function GenLoader({w="w-full"}) {
  return (
    <div className={`${w} h-full flex justify-center items-center`}>
      <div className='gen-loader'></div>
    </div>
  )
}
