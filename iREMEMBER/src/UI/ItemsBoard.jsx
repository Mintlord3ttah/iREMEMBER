import React, { useEffect, useState } from 'react'
import Item from './Item'
import { useQuery } from '@tanstack/react-query'
import { getItems } from '../service/getItems'

export default function ItemsBoard() {
    const {data: items} = useQuery({
        queryKey: ["items"],
        queryFn: getItems,
    })
    
  return<ul className="grid grid-cols-3 gap-y-1">
        {items?.map(v=> <Item key={v.item} item={v}/>)}
    </ul>
}
