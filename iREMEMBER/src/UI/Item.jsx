import { useDataContext } from "../context/DataContext";
import { truncateStr } from "../utils/utility";
import DelteItem from "./DelteItem";
import Flag from "./Flag";
import Packed from "./Packed";
import { FaTimes } from "react-icons/fa";

export default function Item({item}) {
  const {isSelect, isEdit, edit} = useDataContext()
  const packed = item?.packed
  const priorityFlags = {
    high: "text-orange-500", 
    "mid-high": "text-orange-400", 
    normal: "text-orange-300", 
    "mid-low": "text-orange-200", 
    low: "text-orange-50"}

    function handleClick(e){
      const contains = e.target.classList.contains("item")
      if(contains) edit(item)
    }

  if(!item) return
  return (
    <div className="tooltip w-fit">
        <li onClick={handleClick} className="item relative hover:bg-amber-400 bg px-4 w-fit cursor-pointer flex items-center gap-3 rounded-2xl">
          {isSelect && <input type="checkbox" name="select" id="select" />}
          <div className="flex gap-1 items-center w-8">
            <Flag color={packed ? "text-green-500" : "text-yellow-500"} type={"status"} /> {/* STATUS: packed || unpacked */}
            <Flag color={priorityFlags[item?.priority]} type={"priority"} />
            {item?.favourite && <Flag type={"favourite"} />}
            </div>
            {truncateStr(item?.item, 7)}
            <DelteItem id={item?._id} />
        </li>
        <div className="tooltip-text flex flex-col gap-3">
            <p><span className="font-bold">Item: </span>{item?.item}</p>
            <p><span className="font-bold">Purpose: </span>{item?.purpose ? item?.purpose : "NILL"}</p>
            <p><span className="font-bold">Priority:</span> <span className="text-amber-600">{item?.priority}</span></p>
            <p className="flex gap-1 items-center"><span className="font-bold">Count:</span> {item?.count} &#x2022; 
              <Packed packed={packed} id={item._id}/>
            </p>
        </div>
    </div>
  )
}


