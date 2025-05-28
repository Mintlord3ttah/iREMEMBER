import Item from './Item'
import { IoMdRefresh } from "react-icons/io";
import { useQuery } from '@tanstack/react-query'
import { getItems } from '../service/getItems'
import GenLoader from './GenLoader'
import DivCenter from './DivCenter'
import { useDataContext } from '../context/DataContext';
import { useState } from 'react';

export default function ItemsBoard() {
      const {currentUser, displayType} = useDataContext()
      const [view, setView] = useState("")
  
  const accessToken = localStorage.getItem("accessToken")
    const {data: items, isLoading, refetch} = useQuery({
        queryKey: ["items"],
        queryFn: () =>accessToken && getItems({accessToken, id: currentUser?._id}),
    })

  return <div className='max-[780px]:px-12 max-[715px]:px-4 w-full h-full'>
  {isLoading ? <div className='w-full h-full'><GenLoader /></div> : !isLoading && !items ?
    <div className='flex flex-col w-full h-full gap-6 justify-center items-center'>
      <DivCenter>❌ Something went wrong 😰</DivCenter>
      <div className='flex gap-4 items-center'>
      <p>refresh</p> <button onClick={refetch} className='bg-amber-400 hover:bg-amber-500 cursor-pointer rounded-full size-8 text-2xl flex justify-center items-center'><IoMdRefresh /></button>
      </div>
    </div>:
    !isLoading && items?.length <= 0 ? <DivCenter sizeFull='size-full'>🚀 Welcome <span className='font-bold'>{currentUser?.name?.split(" ")[0]}</span>, Add Items To Get Started! 🚀</DivCenter> :
    
     displayType === "list" ?
      <ul className="grid grid-cols-3 max-[400px]:grid-cols-2 gap-y-1 max-[400px]:gap-y-4">
        {items?.map(v=> <Item key={v.item} item={v}/>)}
        {isLoading && <div className='w-full h-full'><GenLoader w='w-fit pl-4' /></div>}
    </ul> :
    <div className='bg-amber-300 border-amber-400 border-2 rounded-2xl p-4 max-[500px]:px-1.5 max-[500px]:py-4 max-[20rem]:scrollbar-thin scrollbar-thumb-amber-400 scrollbar-track-amber-200'>
    <ul className='overflow-y-scroll  flex flex-col max-h-[20rem]'>
      {items?.map((v,i)=> <Item onClick={(e)=>setView(e.target.id)} view={view === v._id} setView={setView} key={v.item} index={i} item={v}/>)}
    </ul>
    </div>
    }
  </div>
}
