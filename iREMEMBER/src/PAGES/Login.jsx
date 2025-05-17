import AuthForm from "../UI/AuthForm";
import {handleFormSubmit as handleSubmit} from "../utils/handleFormSubmit"


export default function Login() {
  return <div className="h-screen flex flex-col justify-center items-center px-4">
    <div className="flex flex-col gap-12">

    <p className="text-3xl font-bold">Login</p>
    <AuthForm submitlabel={"Login"}
              onsubmit={(e)=>handleSubmit(e,"login")} 
              redirectlabel={"Forgot Password"}
              redirectURL={"/Auth/Signup"} 
              createAcc={"Create Accounnt"} />
    </div>
  </div>
}
