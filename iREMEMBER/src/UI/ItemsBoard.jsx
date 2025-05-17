import Item from './Item'
import { IoMdRefresh } from "react-icons/io";
import { useQuery } from '@tanstack/react-query'
import { getItems } from '../service/getItems'
import GenLoader from './GenLoader'
import DivCenter from './DivCenter'
import { useDataContext } from '../context/DataContext';

export default function ItemsBoard() {
      const {currentUser} = useDataContext()
  
  const accessToken = localStorage.getItem("accessToken")
  console.log({currentUser})
    const {data: items, isLoading, refetch} = useQuery({
        queryKey: ["items"],
        queryFn: () => getItems({accessToken, id: currentUser?._id}),
    })

  // if(isSigningUpStatus) return <GenLoader />
  return <>
  {isLoading ? <GenLoader /> : !isLoading && !items ?
    <div className='flex flex-col w-full h-full gap-6 justify-center items-center'>
      <DivCenter>❌ Something went wrong 😰</DivCenter>
      <div className='flex gap-4 items-center'>
      <p>refresh</p> <button onClick={refetch} className='bg-amber-400 hover:bg-amber-500 cursor-pointer rounded-full size-8 text-2xl flex justify-center items-center'><IoMdRefresh /></button>
      </div>
    </div>:
    !isLoading && items?.length <= 0 ? <DivCenter sizeFull='size-full'>🚀 Welcome <span className='font-bold'>{currentUser?.name?.split(" ")[0]}</span>, Add Items To Get Started! 🚀</DivCenter> :
    <ul className="grid grid-cols-3 max-[400px]:grid-cols-2 gap-y-1 max-[400px]:gap-y-4 max-[780px]:px-12 max-[715px]:px-4">
        {items?.map(v=> <Item key={v.item} item={v}/>)}
    </ul>}
  </>
}
