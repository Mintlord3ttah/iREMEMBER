import React from 'react'
import GeneralMutation from './GeneralMutation'
import Sorts from './Sorts'
import { MdMenuOpen } from "react-icons/md";
import GreenBtn from './GreenBtn';

export default function Controllers({handleSelect, isSelect, setOverlayFormControls}) {
  return <>
  <div className='max-[520px]:hidden'>
    <GeneralMutation />
  </div>
    <Sorts />
    <label htmlFor="select" className="flex gap-2 ">
    <input type="checkbox" onClick={handleSelect} defaultChecked={isSelect} name="select" id="select" />
    <span>select</span>
    </label>
    <div className='hidden max-[780px]:flex grow-1 justify-end'>
    <button onClick={()=>setOverlayFormControls(true)} className='text-2xl cursor-pointer hover:bg-amber-400'>
        <MdMenuOpen />
    </button>
    </div>
  </>
}
