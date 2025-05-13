import AuthForm from "../UI/AuthForm";

export default function Login() {
  return <div className="h-screen flex justify-center items-center">
    <AuthForm submitlabel={"Login"} 
              redirectlabel={"Forgot Password"}
              redirectURL={"/Auth/Signup"} 
              createAcc={"Create Accounnt"} />
  </div>
}
