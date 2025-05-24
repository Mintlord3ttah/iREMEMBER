import React from 'react'
import GeneralMutation from './GeneralMutation'
import Sorts from './Sorts'
import { MdMenuOpen } from "react-icons/md";
import { FaListUl } from "react-icons/fa6";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { useDataContext } from '../context/DataContext';

export default function Controllers({handleSelect, isSelect, setOverlayFormControls}) {
  const {displayType, setDisplayType} = useDataContext()
  return <>
  <div className='max-[520px]:hidden'>
    <GeneralMutation />
  </div>
    <Sorts />
    <label htmlFor="select" className="flex gap-2 border rounded-sm px-2 py-0.5 hover:bg-amber-400 cursor-pointer">
    <input type="checkbox" onClick={handleSelect} defaultChecked={isSelect} name="select" />
    <span>select</span>
    </label>
    { displayType === "list" ? <button onClick={()=>setDisplayType("list")} title='list' className='p-1 cursor-pointer hover:bg-amber-400'>
      <FaListUl />
    </button>:
    <button onClick={()=>setDisplayType("grid")} title='grid' className='p-1 cursor-pointer hover:bg-amber-400'>
      <BsFillGrid3X3GapFill />
    </button>}
    <div className='hidden max-[780px]:flex grow-1 justify-end'>
    <button onClick={()=>setOverlayFormControls(true)} className='text-2xl cursor-pointer hover:bg-amber-400'>
        <MdMenuOpen />
    </button>
    </div>
    
  </>
}
