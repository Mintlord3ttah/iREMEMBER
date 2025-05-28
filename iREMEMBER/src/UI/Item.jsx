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
import Favourite from "./Favourite";
import OverlayBtn from "./OverlayBtn";
import ItemOverlay from "./ItemOverlay";

export default function Item({item, index, view, setView, onClick}) {
  const {isSelect, edit, itemStatus, displayType, } = useDataContext()
  const [pickItem, setPickItem] = useState(false)
  const {mutate, status, isPending} = useMutateData({id: item._id, method: "PATCH"})
  const packed = item?.packed
  const priorityFlags = {
    high: "text-orange-700", 
    "mid-high": "text-orange-500", 
    normal: "text-orange-300", 
    "mid-low": "text-orange-200", 
    low: "text-orange-100"}
    
    function handleEdit(e){
      if(e.target?.classList?.contains("item")) edit(item)
      if(e.target.closest(".edit")?.classList.contains("edit")) edit(item)
      if(e.target.closest(".item")?.classList.contains("edit")) edit(item)
    }

  if(!item) return
  return ( <>
  {displayType === "list" ?
    <div className="tooltip w-fit">
        <li onClick={handleEdit} className="item relative hover:bg-amber-400 bg px-4 w-fit cursor-pointer flex items-center gap-3 rounded-2xl">
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
            <button onClick={handleEdit} className="edit cursor-pointer size-8 text-xl backdrop-blur-2xl absolute top-0 right-0 bg-trans flex justify-center items-center">
              <FiEdit />
            </button>
        </div>
    </div>
    :
    <div className="listItem relative flex cursor-pointer transition-all duration-300">
      {!isSelect && <ItemOverlay>
        {!view ? <OverlayBtn title={"View item details"} onClick={onClick} id={item._id}>See more...</OverlayBtn> :
        <OverlayBtn title={"View item details"} onClick={()=> setView("")} id={item._id}>See less...</OverlayBtn>}
        <OverlayBtn title={"Edit item"} label={"item"} onClick={handleEdit}>
          <FiEdit />
        </OverlayBtn>
        <DelteItem id={item?._id} />
      </ItemOverlay>}

      <p className="border-l border-l-amber-700 p-4">{`${index + 1}`.padStart(2, '0')}</p>
      <li className="border-b border-b-amber-700 p-2 flex gap-2 w-full flex-col justify-center">
        <div className="flex gap-2 w-full ">
          <div className={`flex-1 flex gap-1`}>
          {isSelect && <Checkbox state={item.selected} 
                                  status={status} name={"select"}
                                  handlePacked={()=>handleFieldState(setPickItem, pickItem, "selected", mutate)}/>}
          <div className="font-bold flex items-center gap-1.5 w-fit"><Favourite individualIsFavourite={item.favourite} /> {truncateStr(item.item, 7)} </div>
          <p className={`flex-1 flex gap-1 ${!view ? "block" : "hidden"} max-[600px]:hidden transition-all duration-300`}>
            &mdash;
          <span> {truncateStr(item.purpose, view ? "all" : 20)}</span>
          </p>
          </div>
          <p className="border-r pr-2 text-sm border-r-amber-600">{item.priority}</p>
          <p className="border-r pr-2 text-sm border-r-amber-600 font-bold">{item.count}</p>
          <p className={`${packed ? "text-green-700" : "text-yellow-900"} text-sm`}>{item.packed ? "Packed" : "Unpacked"}</p>
        </div>
         {view && <p className={`flex-1 flex gap-1 `}>
          &mdash;
        <span> {view && item.purpose}</span>
        </p>}
      </li>
    </div>}
  </>)
}


