import React, { useEffect, useState } from 'react'
import Item from './Item'
import { useQuery } from '@tanstack/react-query'
import { getItems } from '../service/getItems'
import GenLoader from './GenLoader'

export default function ItemsBoard() {
    const {data: items, isLoading} = useQuery({
        queryKey: ["items"],
        queryFn: getItems,
    })
    
  return <>
  {isLoading ? <GenLoader /> : <ul className="grid grid-cols-3 gap-y-1">
        {items?.map(v=> <Item key={v.item} item={v}/>)}
    </ul>}
  </>
}
