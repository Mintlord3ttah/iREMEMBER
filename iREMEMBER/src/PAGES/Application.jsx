import { useState } from "react";
import AddItemForm from "../UI/AddItemForm";
import EditItemForm from "../UI/EditItemForm";
import GreenBtn from "../UI/GreenBtn";
import Overlay from "../UI/Overlay";
import { useDataContext } from "../context/DataContext";
import ItemsBoard from "../UI/ItemsBoard";
import Stats from "../UI/Stats";
import FavouriteItems from "../UI/FavouriteItems";
import GeneralMutation from "../UI/GeneralMutation";
import Sorts from "../UI/Sorts";

export default function Application() {
  const {select, isEdit, isSelect} = useDataContext()
  const [form, setForm] = useState(false)

  function handleSelect(e){
    select()
  }
  return (
    <section className="grid grid-cols-[2fr_1fr] gap-4 px-8 max-w-[60rem] bg-amber-200 m-auto p-8 min-h-[584px]">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-6 items-center mb-4">
      <h3 className="text-2xl font-bold">ITEMS</h3>
        <GeneralMutation />
        <Sorts />
        <label htmlFor="select" className="flex gap-2 ">
        <input type="checkbox" onClick={handleSelect} defaultChecked={isSelect} name="select" id="select" />
        <span>select</span>
        </label>
        </div>
        <ItemsBoard />
        <Stats />
      </div>

      <div className="anim flex flex-col border-l gap-4 p-4 pb-0">
      {form ? <AddItemForm setForm={setForm} /> :
      <GreenBtn onClick={()=>setForm(true)}>+ Add Item</GreenBtn>}
      <FavouriteItems />
      </div>
      {isEdit && <Overlay>
        <EditItemForm />
      </Overlay>}
    </section>
  )
}
