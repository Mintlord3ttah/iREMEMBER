import React, { useEffect, useState } from 'react'
import Item from './Item'
import { useQuery } from '@tanstack/react-query'

export default function ItemsBoard() {
    const {data: items} = useQuery({
        queryKey: ["items"],
        queryFn: getItems,
    })
    async function getItems() {
        const res = await fetch("http://localhost:3000/api/v1/items")
        const data = await res.json()
        return data.data.items
    }
  return<ul className="grid grid-cols-3 gap-y-1">
        {items?.map(v=> <Item key={v.item} item={v}/>)}
    </ul>
}
