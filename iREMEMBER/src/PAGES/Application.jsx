import { useEffect, useState } from "react";
import EditItemForm from "../UI/EditItemForm";
import Overlay from "../UI/Overlay";
import { useDataContext } from "../context/DataContext";
import ItemsBoard from "../UI/ItemsBoard";
import Stats from "../UI/Stats";
import FavouriteItems from "../UI/FavouriteItems";
import GeneralMutation from "../UI/GeneralMutation";
import Controllers from "../UI/Controllers";
import FormControl from "../UI/FormControl";
import { getUser, refreshAccessToken } from "../service/getUser";
import ProcessUI from "../UI/ProcessUI";
import { FaListUl } from "react-icons/fa6";

let timerId = null

export default function Application() {
  const {select, isEdit, isSelect, getAccessToken, currentUser,getSigningType, signingType, getCurrentUser} = useDataContext()
  const [form, setForm] = useState(false)
  const [OverlayFormControls, setOverlayFormControls] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSelect(e){
    select()
  }
  function handleFormControl(e){
    if(!e.target.classList.contains("absolute")) return
    setOverlayFormControls(false)
  }

  async function rotateAccessToken(){
    const accessToken = localStorage.getItem("accessToken")
    if(!accessToken) await refreshAccessToken();
    const { exp } = JSON.parse(atob(accessToken.split(".")[1])); // Decode JWT expiry time
    if (Date.now() >= exp * 1000){
      const res = await refreshAccessToken();
      if(res){
        const newAcessToken = localStorage.getItem("accessToken")
        getAccessToken(newAcessToken)
        return
      } 
    }
  }

  useEffect(()=>{
    async function user() {
      setLoading(true)
      if(signingType === "login"){
       getSigningType("")
       setLoading(false)
      } 
      try{
          rotateAccessToken()
          const newToken = localStorage.getItem("accessToken")
          getAccessToken(newToken)
          const currUser = await getUser(`user?token=${newToken}`)
          getCurrentUser(currUser)
          setLoading(false)
      }catch(error){
        console.log(error.message)
        setLoading(false)
      }
    }
    user()
},[signingType])

  useEffect(()=>{
    async function rotateTokens(){
      const storedAcessToken = localStorage.getItem("accessToken")
      if(storedAcessToken){
        rotateAccessToken() 
        getAccessToken(storedAcessToken)
        return
      }
      const res = await refreshAccessToken()
      if(!res) return window.location.href = "/Auth/Signup"
      const storedAccessToken = localStorage.getItem("accessToken")
      getAccessToken(storedAccessToken)
    }
    clearInterval(timerId)
    timerId = setInterval(async () => {
      console.log("Token rotation started")
      const res = await rotateTokens()
      if(res){
        const newAcessToken = localStorage.getItem("accessToken")
        getAccessToken(newAcessToken)
        return
      }
    },  60 * 1000); // Check every 1 minute
  },[timerId])

  // console.log({currentUser})
  if(loading || !currentUser?._id) return <ProcessUI />
  return (
    <>
    <section className="relative grid grid-cols-[1fr_308px] max-[780px]:grid-cols-1 overflow-hidden max-[780px]:grid-rows-1 gap-4 max-w-[60rem] bg-amber-200 m-auto min-h-[584px]">
      <div className="relative flex flex-col gap-4 w-full p-8 max-[715px]:px-0 pr-0"> {/**px-8 */}
        <div className="flex gap-6 max-[845px]:justify-between items-center mb-4 max-[780px]:px-12 max-[715px]:px-4">
          <h3 className="max-[870px]:hidden max-[780px]:block max-[715px]:hidden max-[520px]:block text-2xl font-bold">ITEMS</h3>
          <Controllers handleSelect={handleSelect} isSelect={isSelect} setOverlayFormControls={setOverlayFormControls} />
        </div>
        <ItemsBoard />
        <Stats />
      </div>

      <div className="p-8 pl-0 h-full max-[780px]:hidden max-[780px]:h-0">

      <div className="flex flex-col border-l gap-4 p-4 pb-0 h-full">
      <FormControl setForm={setForm} form={form} setOverlayFormControls={setOverlayFormControls} />
      <FavouriteItems />
      </div>
      </div>
      <div onClick={handleFormControl} className={`absolute ${OverlayFormControls ? "show-forms" : "hide-forms"} transition-all duration-[0.8s] hidden overflow-hidden shadow-xl w-full h-full max-[780px]:flex justify-end cstm-bg`}>
      <div className={`h-full transition-all duration-[0.8s] w-0 ${OverlayFormControls ? "w-7/12 opacity-100" : "w-0"} bg-amber-50 max-[510px]:w-9/12 max-[780px]:flex flex-col gap-4 p-4`}>
        <div className={`${form && "hidden"}`}>
        <GeneralMutation />
        </div>
        <FormControl setForm={setForm} form={form} setOverlayFormControls={setOverlayFormControls} />
        <FavouriteItems />
      </div>
      </div>
    </section>
    {isEdit && <Overlay>
        <EditItemForm />
      </Overlay>}
    </>
  )
}