import React from 'react'

export default function DivCenter({children, sizeFull=""}) {
  return <div className={`${sizeFull} flex justify-center items-center`}>
      <p className='text-xl p-4 bg-amber-100 rounded-2xl'>{children}</p>
    </div> 
}
