import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";

export default function Favourite() {
    const [isFavourite, setIsFavourite] = useState(false)

  if(isFavourite) return <p onClick={()=>setIsFavourite(false)}><FaStar  className="cursor-pointer hover:text-amber-900" /></p> 
  return <p onClick={()=>setIsFavourite(true)}><FaRegStar className="cursor-pointer hover:text-amber-900" /></p>
}
