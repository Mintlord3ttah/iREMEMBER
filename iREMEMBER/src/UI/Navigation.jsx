import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { truncateStr } from "../utils/utility";
import { useDataContext } from "../context/DataContext";

export default function Navigation() {
  const {currentUser} = useDataContext()
  const navigate = useNavigate()
  return (
    <nav className=" sticky top-0 left-0 bg-[#fcf9ef] px-12 max-[800px]:px-4 z-50">
      <div className="flex justify-between items-center border-b px-12 max-[600px]:px-4  py-4">
        <Logo />

        <p className="font-bold text-xl">{currentUser?.name}</p>

      </div>
    </nav>
  )
}
