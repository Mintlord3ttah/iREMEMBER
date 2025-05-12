import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

export default function Navigation() {
  const navigate = useNavigate()
  return (
    <nav className=" sticky top-0 left-0 bg-white px-12 max-[800px]:px-4 z-50">
      <div className="flex justify-between items-center border-b px-12 max-[600px]:px-4  py-4">
        <Logo />

        <p>lordmint7@gmail.com</p>
        
        {/* <div className="flex gap-2 ">
          <GreenBtn onClick={()=>navigate("/app")} p="p-2">Login</GreenBtn>
          <GreenBtn p="p-2" bg="transparent">Sign Up</GreenBtn>
        </div> */}
        {/* <div className="flex gap-4">
            <GreenBtn p="p-2">+ ADD</GreenBtn>
        </div> */}
      </div>
    </nav>
  )
}
