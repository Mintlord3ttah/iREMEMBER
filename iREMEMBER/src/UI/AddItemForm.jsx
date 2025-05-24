import Favourite from "./Favourite";
import Priority from "./Priority";
import { useDataContext } from "../context/DataContext";
import useMutateData from "../service/useMutateData";
import { useEffect, useRef } from "react";

export default function AddItemForm({setForm, setOverlayFormControls}) {
  const {resetIsFavourite, isFavourite, currentUser} = useDataContext()
  const {mutate, status} = useMutateData({method: "POST", id: ""})  
  const itemRef = useRef(null)
  
function handleSubmit(e){
    e.preventDefault()

    const formData = new FormData(e.target)
    const item = formData.get("item")
    const purpose = formData.get("purpose")
    const count = formData.get("count") || 1
    const packed = formData.get("pack") === "on" ? true : false
    const priority = formData.get("priority").includes("priority:") ? "normal" : formData.get("priority") 
    
    const deps = {purpose, count, packed, priority, createdById: currentUser?._id, favourite: isFavourite}
    const items = item.split(",")
    
    let obj = items.length > 1 ? 
              [...new Set(items)]
              .map(item => ({item, ...deps})) :
              {item, ...deps}
    mutate(JSON.stringify(obj))
    resetIsFavourite()
    setForm(false)
    setOverlayFormControls(false)
    e.target.reset()
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        e.target.form.requestSubmit();
    }
}


useEffect(()=>itemRef.current.focus(),[])

  return(<form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className=" bg-amber-300 gap-3 h-[280px] max-[400px]:grow-0 rounded-2xl border p-4 flex flex-col grow-1 justify-between" >
  <div className="flex justify-between items-center">
    <div className="flex gap-3">
      <span>New Item</span>
      <button onClick={()=>setForm(false)} className="bg-amber-400 hover:bg-amber-500 px-4 py-1 rounded-sm cursor-pointer">Cancel</button>
    </div>
     <Favourite />
  </div>
  <input ref={itemRef} type="text" className="w-full bg-amber-100 rounded-sm h-8 px-2" name="item" max={25}  placeholder="Item Name" required/>
  <input type="text" className="w-full bg-amber-100 rounded-sm h-8 px-2" name="purpose" max={100} placeholder="Purpose"/>
  <input type="number" max={50} min={1} className="w-full bg-amber-100 rounded-sm h-8 px-2" name="count" placeholder="Count"/>
  <Priority width={"w-full"} />
  <div className="flex w-full justify-between items-center">
  <label htmlFor="pack" className="flex gap-3">
    <input type="checkbox" name="pack"/>
    <span className="text-sm">Mark as packed</span>
  </label>
  <input type="submit" value="Save" className="w-fit bg-amber-500 rounded-2xl p-2 cursor-pointer hover:bg-amber-600"/>
  </div>
</form>)
}
