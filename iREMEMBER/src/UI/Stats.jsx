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

  return<div className="flex justify-end flex-col grow-1 max-[780px]:px-12 max-[715px]:px-4">
          <div className="row-stats h-20 rounded-2xl w-full bg-amber-500 flex items-center mt-4 px-4">
            
              <span className="font-bold">Stats: </span>
                { packed == total ? <span>✔ You have packed all items, </span> :
            <>
                You have packed <StatsNumber color={"text-green-500"}>{packed}</StatsNumber> items,
             and <StatsNumber color={"text-amber-400"}>{unpacked}</StatsNumber> items unpacked,
            </>
             } total of <StatsNumber color={"text-blue-500"}>{total}</StatsNumber>
          </div>
          <ColumnStats>
          { packed == total ? <span>✔ You have packed all items, </span> :
          <>
            <StatCon label={"Packed"}>
                <StatsNumber color={"text-green-500"}>{packed}</StatsNumber>
            </StatCon>
            <StatCon label={"Unpacked"}>
                <StatsNumber color={"text-amber-400"}>{unpacked}</StatsNumber>
            </StatCon>
          </>
          }
            <StatCon label={"Total"}>
               <StatsNumber color={"text-blue-500"}>{total}</StatsNumber>
            </StatCon>
          </ColumnStats>
          </div>
}

function ColumnStats({children}){
    return <div className='col-stats rounded-2xl w-full bg-amber-500 flex flex-col gap-4 mt-4 px-4 py-8'>
        <p className='font-bold text-xl'>Stats</p>

        {children}
    </div>
}

function StatCon({children,label}){
    return <div className='flex gap-4 items-center'><p className='font-bold'>{label}:</p> {children}</div>
}
