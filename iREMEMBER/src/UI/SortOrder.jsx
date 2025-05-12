import { useDataContext } from '../context/DataContext'

export default function SortOrder() {
    

  return<label htmlFor="order" className='flex gap-2'>
            <p>Asc</p>
            <RadioBtn label={"asc"} />
            <p>Desc</p>
            <RadioBtn label={"desc"} />
        </label>
}


function RadioBtn({label}){
    const {getSortOrder, sortOrder} = useDataContext()

    return <input onClick={()=>getSortOrder(label)} type="radio" defaultChecked={label === sortOrder} name="order" id={label} />
}