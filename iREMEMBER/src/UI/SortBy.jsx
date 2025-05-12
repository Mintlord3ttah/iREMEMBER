import { useQuery } from '@tanstack/react-query'
import { useDataContext } from '../context/DataContext'
import { getItems, sortItems } from '../service/getItems'

export default function SortBy({children}){
const {memoizedSortStr, getSortStr} = useDataContext()
    const {data: items, refetch} = useQuery({
        queryKey: ["items"],
        queryFn: ()=> sortItems(memoizedSortStr),
        enabled: !!memoizedSortStr?.sortField
    })    

    function handleClick(e){
        if(!e.target.classList.contains("sort")) return
        getSortStr(children)
        refetch()
    }

    return <p onClick={handleClick} className={`sort p-2 bg-amber-200 hover:bg-amber-500 ${memoizedSortStr?.sortField === children && "bg-amber-500"} rounded-md cursor-pointer`}>{children}</p>
}
