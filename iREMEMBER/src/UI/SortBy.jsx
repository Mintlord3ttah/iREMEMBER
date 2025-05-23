import { useEffect } from 'react'
import { useDataContext } from '../context/DataContext'
import useMutateData from '../service/useMutateData'
import { BACKEND_URL } from '../utils/backendSite'
import { useQuery } from '@tanstack/react-query'
import { sortItems } from '../service/sortItems'
import { useCallback } from 'react'
import { useState } from 'react'

export default function SortBy({children, order, bg}){
const {currentUser} = useDataContext()
const [sortStr, setSortStr] = useState("")
const [countClicks, setCountClicks] = useState(0)
const {data: items, isLoading, refetch} = useQuery({
        queryKey: ["items"],
        queryFn: () =>sortItems({id: currentUser?._id, sortObj: {sortField: sortStr, sortOrder: order}}),
        enabled: !!sortStr,
    })

    function handleClick(e){
        setSortStr("")
        if(!e.target.classList.contains("sort")) return
        setSortStr(children)
        setCountClicks(prev=> prev +1)
    }

    useEffect(()=>{refetch()},[countClicks])
    return <p onClick={handleClick} className={`sort p-2 bg-amber-200 hover:bg-amber-500 rounded-md cursor-pointer`}>{children}</p>
}
