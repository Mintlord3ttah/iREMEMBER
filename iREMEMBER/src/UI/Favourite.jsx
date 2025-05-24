import { FaRegStar, FaStar } from "react-icons/fa";
import { useDataContext } from "../context/DataContext";
import { useEffect } from "react";

export default function Favourite({individualIsFavourite}) {
    const {isFavourite, setIsFavourite} = useDataContext()

    useEffect(()=>{
      setIsFavourite(individualIsFavourite)
    },[individualIsFavourite])
  if(isFavourite) return <p onClick={()=>setIsFavourite(false)}><FaStar  className="cursor-pointer hover:text-amber-900" /></p> 
  return <p onClick={()=>setIsFavourite(true)}><FaRegStar className="cursor-pointer hover:text-amber-900" /></p>
}
