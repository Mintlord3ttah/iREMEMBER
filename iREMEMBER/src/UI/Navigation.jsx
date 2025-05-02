import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import GreenBtn from "./GreenBtn";

export default function Navigation() {
  const navigate = useNavigate()
  return (
    <nav className=" sticky top-0 left-0 bg-white px-12 max-[800px]:px-4">
      <div className="flex justify-between items-center border-b px-12 max-[600px]:px-4  py-4">
        <Logo />

        <div className="flex gap-2 ">
          <GreenBtn onClick={()=>navigate("/app")} p="p-2">Login</GreenBtn>
          <GreenBtn p="p-2" bg="transparent">Sign Up</GreenBtn>
        </div>
        {/* <div className="flex gap-4">
            <GreenBtn p="p-2">+ ADD</GreenBtn>
            <GreenBtn bg="bg-amber-500" p="p-2">SORT</GreenBtn>
            <GreenBtn bg="bg-red-500" p="p-2">CLEAR</GreenBtn>
        </div> */}
      </div>
    </nav>
  )
}
