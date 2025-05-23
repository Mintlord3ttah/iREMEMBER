import { useState } from 'react'
import SortBy from './SortBy'
import SortOrder from './SortOrder'

const sortStrings = ["createdAt","packed","unpacked","favourite","priority"]

export default function Sorts() {
  const [sort, setSort] = useState(false)
  const [order, setOrder] = useState("asc")
  
  function handleSortClick(e){
    e.target.classList.contains("sort") && setSort(false)
  }

    return (
        <div className='relative'>
            <p onClick={()=>setSort(sort=> !sort)} className='px-3 py-1 bg-amber-300 hover:bg-amber-400 rounded-sm cursor-pointer'>Sort by</p>
            <div className={`${sort ? "show" : "hide"} flex flex-col gap-5 z-20 rounded-2xl border absolute top-full left-0 bg-amber-300 w-[15rem] p-4`}>
                    <div className='flex gap-4'>
                        <p className='font-bold'>Order:</p>
                        <SortOrder order={order}  setOrder={setOrder} />
                    </div>
                <div onClick={handleSortClick} className='grid grid-cols-2 gap-3'>
                    {sortStrings.map(v=> <SortBy order={order} key={v}>{v}</SortBy>)}
                </div>
            </div>
        </div>
    )
}


