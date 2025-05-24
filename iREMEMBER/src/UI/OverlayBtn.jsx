import React from 'react'

export default function OverlayBtn({children, title, onClick, label="", id}) {
  return (
    <button title={title} className={` relative cursor-pointer backdrop-blur-2xl hover:bg-amber-400/50 p-1 flex justify-center items-center`}>
          {children}
          <div onClick={onClick} id={id} className={`${label} absolute w-full h-full top-0 left-0`}></div>
        </button>
  )
}
