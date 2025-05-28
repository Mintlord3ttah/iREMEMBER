import React from 'react'
import { useDataContext } from '../context/DataContext'

export default function OverlayContainer({children}) {
    const {overlayFormControls, setOverlayFormControls} = useDataContext()

    function handleClick(e) {
        if (!e.target.classList.contains("absolute")) return
            setOverlayFormControls(false)
    }
  return <div onClick={handleClick} className={`absolute ${overlayFormControls ? "show-forms" : "hide-forms"} transition-all duration-[0.8s] hidden overflow-hidden shadow-xl w-full h-full max-[780px]:flex justify-end cstm-bg`}>
        {children}
    </div>
}
