import { useState } from "react";
import { useDataContext } from "../context/DataContext";
import { handleFieldState, truncateStr } from "../utils/utility";
import DelteItem from "./DelteItem";
import Flag from "./Flag";
import Packed from "./Packed";
import { FiEdit } from "react-icons/fi";
import Checkbox from "./Checkbox";
import useMutateData from "../service/useMutateData";
import GenLoader from "./GenLoader";
import Loader from "./Loader";

export default function Item({item}) {
  const {isSelect, edit, itemStatus} = useDataContext()
  const [pickItem, setPickItem] = useState(false)
  const {mutate, status, isPending} = useMutateData({id: item._id, method: "PATCH"})
  const packed = item?.packed
  const priorityFlags = {
    high: "text-orange-700", 
    "mid-high": "text-orange-500", 
    normal: "text-orange-300", 
    "mid-low": "text-orange-200", 
    low: "text-orange-100"}

    function handleClick(e){
      const contains = e.target?.classList?.contains("item") || e.target.closest(".edit").classList.contains("edit")
      if(contains) edit(item)
    }

  if(!item) return
  // if(isLoading) return <GenLoader />
  return (
    <div className="tooltip w-fit">
        <li onClick={handleClick} className="item relative hover:bg-amber-400 bg px-4 w-fit cursor-pointer flex items-center gap-3 rounded-2xl">
            {itemStatus === "pending" && <span className="size-5"><Loader /></span>}
          {isSelect && <Checkbox state={item.selected} 
                                 status={status} name={"select"}
                                 handlePacked={()=>handleFieldState(setPickItem, pickItem, "selected", mutate)}/>}
          <div className="flex gap-1 items-center w-8">
            <Flag color={packed ? "text-green-500" : "text-yellow-500"} type={"status"} /> {/* STATUS: packed || unpacked */}
            <Flag color={priorityFlags[item?.priority]} type={"priority"} />
            {item?.favourite && <Flag type={"favourite"} />}
            </div>
            {truncateStr(item?.item, 7)}
            <DelteItem id={item?._id} />
        </li>
        <div className="tooltip-text max-[400px]:hidden relative flex flex-col gap-3">
            <p><span className="font-bold">Item: </span>{item?.item}</p>
            <p><span className="font-bold">Purpose: </span>{item?.purpose ? item?.purpose : "NILL"}</p>
            <p><span className="font-bold">Priority:</span> <span className="text-amber-600">{item?.priority}</span></p>
            <p className="flex gap-1 items-center"><span className="font-bold">Count:</span> {item?.count} &#x2022; 
              <Packed packed={packed} id={item._id}/>
            </p>
            <button onClick={handleClick} className="edit cursor-pointer size-8 text-xl backdrop-blur-2xl absolute top-0 right-0 bg-trans flex justify-center items-center">
              <FiEdit />
            </button>
        </div>
    </div>
  )
}


