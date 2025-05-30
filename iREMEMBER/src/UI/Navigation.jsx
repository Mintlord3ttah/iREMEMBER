import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { truncateStr } from "../utils/utility";
import { useDataContext } from "../context/DataContext";
import { IoNotifications } from "react-icons/io5";
import GreenBtn from "./GreenBtn"
import { useQuery } from "@tanstack/react-query";
import { getItems } from "../service/getItems";
import NotificationCount from "./NotificationCount";

export default function Navigation() {
  const navigate = useNavigate()
  const {currentUser} = useDataContext()

  return (
    <nav className=" sticky top-0 left-0 bg-[#fcf9ef] px-12 max-[800px]:px-4 z-50">
      <div className="flex justify-between items-center border-b px-12 max-[600px]:px-4  py-4">
        <Logo />

         <div className="flex items-center gap-4">
          { currentUser?._id && <>
            <button onClick={()=>navigate('/app/notifications')} className="relative">
              <IoNotifications className="text-2xl hover:text-amber-600" />
              <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
                <NotificationCount />
              </span>
            </button>
            <p className="font-bold text-xl">{currentUser?.name}</p>
          </>}
          {
            !currentUser?._id && <>
            <GreenBtn onClick={()=>navigate("/auth/login")} >
              Login
            </GreenBtn>
            <GreenBtn bg="bg-transparent" onClick={()=>navigate("/auth/signup")} >
              Signup
            </GreenBtn>
            </>
          }
        </div>
      </div>
    </nav>
  )
}
