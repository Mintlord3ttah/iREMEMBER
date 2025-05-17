import AuthForm from "../UI/AuthForm";
import {handleFormSubmit as handleSubmit} from "../utils/handleFormSubmit"


export default function Login() {

  function handleLogin(e){
    const res = handleSubmit(e,"user/login")
    if(res) window.location.href = "/Auth/Processing"
    else return
  }
  return <div className="h-screen flex flex-col justify-center items-center px-4">
    <div className="flex flex-col gap-12">

    <p className="text-3xl font-bold">Login</p>
    <AuthForm submitlabel={"Login"}
              onsubmit={handleLogin} 
              redirectlabel={"Forgot Password"}
              redirectURL={"/Auth/Signup"} 
              createAcc={"Create Accounnt"} />
    </div>
  </div>
}
