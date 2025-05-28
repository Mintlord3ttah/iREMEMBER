import React from 'react'
import { useDataContext } from '../context/DataContext'

export default function RightOverlayBoard({children}) {
    const {overlayFormControls} = useDataContext()
  return <div className={`h-full transition-all duration-[0.8s] w-0 ${overlayFormControls ? "w-7/12 opacity-100" : "w-0"} bg-amber-50 max-[510px]:w-9/12 max-[780px]:flex flex-col gap-4 p-4`}>
    {children}
    </div>
}
