
export default function SortOrder({setOrder, order}) {
    
  return<label htmlFor="order" className='flex gap-2'>
            <p>Asc</p>
            <RadioBtn setOrder={setOrder} order={order} label={"asc"} />
            <p>Desc</p>
            <RadioBtn setOrder={setOrder} order={order} label={"desc"} checked={true} />
        </label>
}

function RadioBtn({label, order, setOrder, checked}){
    return <input onClick={()=>setOrder(label)} type="radio" defaultChecked={label === order || checked} name="order" id={label} />
}