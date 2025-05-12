import { useState } from 'react'
import SortBy from './SortBy'
import SortOrder from './SortOrder'

export default function Sorts() {
  const [sort, setSort] = useState(false)
  
  function handleSortClick(e){
    e.target.classList.contains("sort") && setSort(false)
  }

    return (
        <div className='relative'>
            <p onClick={()=>setSort(sort=> !sort)} className='px-3 py-1 bg-amber-300 hover:bg-amber-400 rounded-sm cursor-pointer'>Sort by</p>
            <div className={`${sort ? "show" : "hide"} flex flex-col gap-5 z-20 rounded-2xl border absolute top-full left-0 bg-amber-300 w-[15rem] p-4`}>
                    <div className='flex gap-4'>
                        <p className='font-bold'>Order:</p>
                        <SortOrder />
                    </div>
                <div onClick={handleSortClick} className='grid grid-cols-2 gap-3'>
                    <SortBy>createdAt</SortBy>
                    <SortBy>packed</SortBy>
                    <SortBy>unpacked</SortBy>
                    <SortBy>favourite</SortBy>
                    <SortBy>priority</SortBy>
                </div>
            </div>
        </div>
    )
}


