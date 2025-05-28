
export default function SwitchBtn({a="on", b="off", value, setValue}) {
        
    return <div className='relative w-16 h-6 rounded-2xl border border-amber-400 bg-amber-100 flex gap-0.5 p-0.5'>
        <div onClick={()=>setValue(false)} className='text-xs flex items-center justify-center h-full w-full rounded-2xl border border-amber-300 cursor-pointer hover:bg-amber-200 transition-all duration-500'>
        {b}
        </div>
        <div onClick={()=>setValue(prev=>!prev)} className={`${value ? "-right-1" : "-left-1"} font-bold text-gray-900 gradient size-8 rounded-full bg-amber-400 absolute -top-1/4 cursor-pointer transition-all duration-500 text-xs flex items-center justify-center`}>
            {value ? a : b}
        </div>
        <div onClick={()=>setValue(true)} className='text-xs flex items-center justify-center h-full w-full rounded-2xl border border-amber-300 cursor-pointer hover:bg-amber-200 transition-all duration-500'>
            {a}
        </div>
    </div>
}
