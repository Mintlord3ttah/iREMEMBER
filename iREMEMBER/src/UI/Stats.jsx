import React from 'react'
import StatsNumber from './StatsNumber'
import { getItems } from '../service/getItems'
import { useQuery } from '@tanstack/react-query'

export default function Stats() {
    const {data: items} = useQuery({
        queryKey: ["items"],
        queryFn: getItems,
    })

    const total = items?.length
    const packed = items?.filter(v=> v.packed).length
    const unpacked = items?.filter(v=> !v.packed).length

  return<div className="flex justify-end flex-col grow-1">
          <div className="h-20 rounded-2xl w-full bg-amber-500 flex items-center mt-4 px-4">
            
              <span className="font-bold">Stats: </span>
                { packed == total ? <span>✔ You have packed all items, </span> :
            <>
                You have packed <StatsNumber color={"text-green-500"}>{packed}</StatsNumber> items,
             and <StatsNumber color={"text-amber-400"}>{unpacked}</StatsNumber> items unpacked,
            </>
             } total of <StatsNumber color={"text-blue-500"}>{total}</StatsNumber>
          </div>
          </div>
}
