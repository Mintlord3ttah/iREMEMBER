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
import { getUser } from "../service/getUser";

export default function Application() {
  const {select, isEdit, isSelect, sessionId, getSession} = useDataContext()
  const [form, setForm] = useState(false)
  const [OverlayFormControls, setOverlayFormControls] = useState(false)

  function handleSelect(e){
    select()
  }
  function handleFormControl(e){
    if(!e.target.classList.contains("absolute")) return
    setOverlayFormControls(false)
  }

  useEffect(()=> getSession(getUser(sessionId)),[])
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
