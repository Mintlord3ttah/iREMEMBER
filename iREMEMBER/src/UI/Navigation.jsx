import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { truncateStr } from "../utils/utility";
import { useDataContext } from "../context/DataContext";
import { IoNotifications } from "react-icons/io5";

export default function Navigation() {
  const {currentUser} = useDataContext()
  const navigate = useNavigate()
  return (
    <nav className=" sticky top-0 left-0 bg-[#fcf9ef] px-12 max-[800px]:px-4 z-50">
      <div className="flex justify-between items-center border-b px-12 max-[600px]:px-4  py-4">
        <Logo />

        <div className="flex items-center gap-4">
          <button onClick={()=>navigate("/notifications")} className="relative">
            <IoNotifications className="text-2xl hover:text-amber-600" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs px-1">3</span>
          </button>
        <p className="font-bold text-xl">{currentUser?.name}</p>
        </div>

      </div>
    </nav>
  )
}
