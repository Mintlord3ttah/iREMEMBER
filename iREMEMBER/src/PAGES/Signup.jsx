import AuthForm from '../UI/AuthForm'
import { useDataContext } from '../context/DataContext'
import {handleFormSubmit as handleSubmit} from "../utils/handleFormSubmit"

export default function Signup() {
  const {getSigningType} = useDataContext()

function onSubmitHandler(e){
  const res = handleSubmit(e)
  getSigningType("signup")
}

  return <div className="h-screen flex justify-center items-center px-4">
    <div className="flex flex-col gap-12">


    <p className="text-3xl font-bold">Signup</p>
  <AuthForm onsubmit={onSubmitHandler} submitlabel={"Signup"} redirectlabel={"Have an account? Login"} redirectURL={"/Auth/Login"}>
    <label className={`border-b-2 border-amber-700 flex gap-4 items-center px-3`}>
  <span className='font-bold'>Names:</span>
  <input type="text" name='names'  className="w-full bg-transparent outline-none" required />
</label>
  </AuthForm>
  </div>
  </div>
}
