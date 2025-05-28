import { useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

export default function NumberSelector({label, br="", text, max, min, setTimeValue, timeValue}){
    const [isFocused, setIsFocused] = useState(false)

    const handleDecrement = ()=> { 
        setTimeValue(prev=> +prev <= min ? max : +prev -1);
        setIsFocused(false)
    }
    const handleIncrement = ()=> {        
        setTimeValue(prev=> +prev === max ? min : +prev +1); 
        setIsFocused(false)
    }
    const handleFocus = ()=>{
      setTimeValue("")
      setIsFocused(true)
    }
    const handleChange = (e)=>{
      setTimeValue(e.target.value)
    }


    return <div className={`time-picker flex flex-col ${br} px-4`}>
                <div onClick={handleIncrement} className='selector hover:bg-amber-300 w-fit py-1 px-2'>
                    <MdKeyboardArrowUp className='text-2xl' />
                </div>
                <span className='text-gray-700'>{text}</span>
                <input onFocus={handleFocus} onChange={handleChange} value={isFocused ? timeValue : `${timeValue}`.padStart(2, "0")} className='w-12 ml-3 bg-transparent outline-none' type="number" max={max} name={label} id={label} />
                <div onClick={handleDecrement} className='selector hover:bg-amber-300 w-fit py-1 px-2'>
                    <MdKeyboardArrowDown className='text-2xl' />
                </div>
            </div>
}
