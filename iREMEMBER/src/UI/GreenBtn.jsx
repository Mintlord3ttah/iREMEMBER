import React from 'react'

export default function GreenBtn({onClick, children, bg="bg-green-500", p="p-4"}) {
  return <button onClick={onClick} className={`${bg} ${p} rounded-lg  border  hover:bg-green-600 cursor-pointer`}>{children}</button>

}
