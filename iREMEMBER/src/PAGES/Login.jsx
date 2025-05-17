import AuthForm from "../UI/AuthForm";

export default function Login() {
  return <div className="h-screen flex flex-col justify-center items-center px-4">
    <div className="flex flex-col gap-12">

    <p className="text-3xl font-bold">Login</p>
    <AuthForm submitlabel={"Login"} 
              redirectlabel={"Forgot Password"}
              redirectURL={"/Auth/Signup"} 
              createAcc={"Create Accounnt"} />
    </div>
  </div>
}
