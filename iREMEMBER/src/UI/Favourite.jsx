import { FaRegStar, FaStar } from "react-icons/fa";
import { useDataContext } from "../context/DataContext";

export default function Favourite() {
    const {isFavourite, setIsFavourite} = useDataContext()
    console.log(isFavourite)

  if(isFavourite) return <p onClick={()=>setIsFavourite(false)}><FaStar  className="cursor-pointer hover:text-amber-900" /></p> 
  return <p onClick={()=>setIsFavourite(true)}><FaRegStar className="cursor-pointer hover:text-amber-900" /></p>
}
