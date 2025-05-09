import React from 'react'
import { getItems } from '../service/getItems'
import { useQuery } from '@tanstack/react-query'

export default function FavouriteItems() {
    const {data: items} = useQuery({
        queryKey: ["items"],
        queryFn: getItems,
    })
    const favourites = items?.filter(v=>v.favourite)
  return <div className="bg-amber-300 h-[202px] overflow-hidden rounded-2xl border p-4 flex flex-col gap-3" >
  <div className='overflow-y-scroll'>
  <h3 className="font-bold">Favourite Items</h3>
  {favourites?.map(v=> <p key={v.item}>{v.item}</p>)}
  </div>
</div>
}
