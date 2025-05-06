import React from 'react'

export default function StatsNumber({children, color}) {
  return <span className={`size-8 mx-2 flex justify-center items-center rounded-full bg-amber-950 ${color} font-bold`}>{children}</span>
}
