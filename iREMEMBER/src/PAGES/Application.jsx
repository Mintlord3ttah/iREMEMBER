import Item from "../UI/Item";

export default function Application() {
  return (
    <section className="grid grid-cols-[2fr_1fr] gap-4 px-8 max-w-[60rem] bg-amber-200 m-auto p-8 ">
      <div className="flex flex-col gap-4">
      <div className="flex gap-6 items-center mb-4">
      <h3 className="text-2xl font-bold">ITEMS</h3>
      <label htmlFor="pack-all" className="flex gap-3">
          <input type="checkbox" name="pack-all"/>
          <span>Mark all as packed</span>
        </label>
        </div>
        <div className="flex gap-16">
        <ul className="flex flex-col gap-3">
          <Item>Item 1 long text yeah</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
          <Item>Item 4</Item>
          <Item>Item 5</Item>
          <Item>Item 6</Item>
          <Item>Item 7</Item>
          <Item>Item 8</Item>
          <Item>Item 9</Item>
          <Item>Item 10</Item>
        </ul>
        <ul className="flex flex-col gap-3">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
          <Item>Item 4</Item>
          <Item>Item 5</Item>
          <Item>Item 6</Item>
          <Item>Item 7</Item>
          <Item>Item 8</Item>
          <Item>Item 9</Item>
          <Item>Item 10</Item>
        </ul>
        <ul className="flex flex-col gap-3">
          <Item>Item 1</Item>
          <Item>Item 2</Item>
          <Item>Item 3</Item>
          <Item>Item 4</Item>
          <Item>Item 5</Item>
          <Item>Item 6</Item>
          <Item>Item 7</Item>
          <Item>Item 8</Item>
          <Item>Item 9</Item>
          <Item>Item 10</Item>
        </ul>
        </div>
        <div className="h-20 rounded-2xl w-full bg-amber-500 flex justify-center items-center mt-4">
          Stats: You have packed x items, and x items unpacked, total of x
        </div>
      </div>

      <div className="flex flex-col border-l gap-4 p-4 pb-0">
      <form className="bg-amber-300 gap-3 h-full rounded-2xl border p-4 flex flex-col grow-1 justify-between" >
        <h5>New Item</h5>
        <input type="text" className="w-full bg-amber-100 rounded-sm h-8 px-2" name="item"  placeholder="Item Name"/>
        <input type="text" className="w-full bg-amber-100 rounded-sm h-8 px-2" name="purpose" placeholder="Purpose"/>
        <input type="number" max={50} min={1} className="w-full bg-amber-100 rounded-sm h-8 px-2" name="count" placeholder="Count"/>
        {/* <input type="text" className="w-full bg-amber-100 rounded-sm h-8 px-2" name="priority" placeholder="Priority"/> */}
        <select name="priority" id="priority" className="w-full bg-amber-100 rounded-sm h-8 px-2" placeholder="Priority">
          <option className="font-bold">priority:</option>
          <option value="high">High</option>
          <option value="mid-high">Mid High</option>
          <option value="normal" selected>Normal</option>
          <option value="mid-low">Mid Low</option>
          <option value="low">Low</option>
        </select>
        {/* <input type="text" className="w-full bg-amber-100 rounded-sm h-8 px-2" /> */}
        <div className="flex w-full justify-between items-center">
        <label htmlFor="pack-all" className="flex gap-3">
          <input type="checkbox" name="pack-all"/>
          <span className="text-sm">Mark as packed</span>
        </label>
        <input type="submit" value="Save" className="w-fit bg-amber-500 rounded-2xl p-2 cursor-pointer hover:bg-amber-600"/>
        </div>
      </form>
      <div className="bg-amber-300 h-full rounded-2xl border p-4 flex flex-col gap-3" >
        <h3 className="font-bold">Favourite Items</h3>
        <p>Item 1</p>
        <p>Item 2</p>
        <p>Item 3</p>
        <p>Item 4</p>
      </div>
      </div>
    </section>
  )
}
