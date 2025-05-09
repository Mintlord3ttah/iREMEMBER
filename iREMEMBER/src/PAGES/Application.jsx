import { useState } from "react";
import AddItemForm from "../UI/AddItemForm";
import EditItemForm from "../UI/EdititemForm";
import GreenBtn from "../UI/GreenBtn";
import Item from "../UI/Item";
import Overlay from "../UI/Overlay";
import StatsNumber from "../UI/StatsNumber";
import { useDataContext } from "../context/DataContext";
import ItemsBoard from "../UI/ItemsBoard";
import Stats from "../UI/Stats";
import FavouriteItems from "../UI/FavouriteItems";
import GeneralMutation from "../UI/GeneralMutation";

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
        <select name="priority" id="priority" className="w-fit bg-amber-100 rounded-sm h-8 px-2" placeholder="Priority">
          <option className="font-bold" selected>Sort by</option>
          <option value="pack-all" >Time</option>
          <option value="pack-all">packed</option>
          <option value="delete-all" >unpacked</option>
          <option value="delete-all" >priority</option>
        </select>
        <label htmlFor="select" className="flex gap-2 ">
        <input type="checkbox" onClick={handleSelect} checked={isSelect} name="select" id="select" />
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
