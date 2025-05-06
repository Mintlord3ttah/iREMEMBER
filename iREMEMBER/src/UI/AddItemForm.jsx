
export default function AddItemForm() {
  return(<form className="bg-amber-300 gap-3 h-full rounded-2xl border p-4 flex flex-col grow-1 justify-between" >
  <h5>New Item</h5>
  <input type="text" className="w-full bg-amber-100 rounded-sm h-8 px-2" name="item"  placeholder="Item Name"/>
  <input type="text" className="w-full bg-amber-100 rounded-sm h-8 px-2" name="purpose" placeholder="Purpose"/>
  <input type="number" max={50} min={1} className="w-full bg-amber-100 rounded-sm h-8 px-2" name="count" placeholder="Count"/>
  {/* <input type="text" className="w-full bg-amber-100 rounded-sm h-8 px-2" name="priority" placeholder="Priority"/> */}
  <select name="priority" id="priority" className="w-full bg-amber-100 rounded-sm h-8 px-2" placeholder="Priority">
    <option className="font-bold" selected>priority: Normal</option>
    <option value="high">High</option>
    <option value="mid-high">Mid High</option>
    <option value="normal" >Normal</option>
    <option value="mid-low">Mid Low</option>
    <option value="low">Low</option>
  </select>
  {/* <input type="text" className="w-full bg-amber-100 rounded-sm h-8 px-2" /> */}
  <div className="flex w-full justify-between items-center">
  <label htmlFor="pack-all" className="flex gap-3">
    <input type="checkbox" name="pack-all"/>
    <span className="text-sm">Mark as priority</span>
  </label>
  <input type="submit" value="Save" className="w-fit bg-amber-500 rounded-2xl p-2 cursor-pointer hover:bg-amber-600"/>
  </div>
</form>)
}
