
export default function Priority({width}) {
  return <select name="priority" id="priority" className={`${width} bg-amber-100 rounded-sm h-8 px-2`} placeholder="Priority">
  <option className="font-bold" selected>priority: Normal</option>
  <option value="high">High</option>
  <option value="mid-high">Mid High</option>
  <option value="normal" >Normal</option>
  <option value="mid-low">Mid Low</option>
  <option value="low">Low</option>
</select>
}
