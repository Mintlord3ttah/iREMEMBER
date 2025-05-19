import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import AuthForm from "../UI/AuthForm";
import {handleFormSubmit as handleSubmit} from "../utils/handleFormSubmit"

export default function Login() {
  const {getSigningType, getCurrentUser} = useDataContext()
  const navigate = useNavigate()

  async function handleLogin(e){
    e.preventDefault()
    const res = await handleSubmit(e,"user/login")
    if(res) {
      localStorage.setItem("accessToken", res.user.accessToken)
      getSigningType("login")
      getCurrentUser(res.user)
      navigate("/app")
    } else return
  }
  return <div className="h-screen flex flex-col justify-center items-center px-4">
    <div className="flex flex-col gap-12">

    <p className="text-3xl font-bold">Login</p>
    <AuthForm submitlabel={"Login"}
              onsubmit={handleLogin} 
              redirectlabel={"Forgot Password"}
              redirectURL={"/Auth/Signup"} 
              createAcc={"Create Account"} />
    </div>
  </div>
}
