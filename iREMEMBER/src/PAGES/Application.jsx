import AddItemForm from "../UI/AddItemForm";
import EditItemForm from "../UI/EdititemForm";
import GreenBtn from "../UI/GreenBtn";
import Item from "../UI/Item";
import Overlay from "../UI/Overlay";
import StatsNumber from "../UI/StatsNumber";

export default function Application() {
  return (
    <section className="grid grid-cols-[2fr_1fr] gap-4 px-8 max-w-[60rem] bg-amber-200 m-auto p-8 ">
      <div className="flex flex-col gap-4">
      <div className="flex gap-6 items-center mb-4">
      <h3 className="text-2xl font-bold">ITEMS</h3>
        <select name="priority" id="priority" className="w-fit bg-amber-100 rounded-sm h-8 px-2" placeholder="Priority">
          <option className="font-bold">Select</option>
          <option value="pack-all" selected>Pack all</option>
          <option value="pack-all">Unpack all</option>
          <option value="favourite-all" >Favourite all</option>
          <option value="delete-all" >Delete all</option>
          <option value="delete-all" >Delete all selected</option>
          <option value="delete-all" >Delete all not priority (p)</option>
          <option value="delete-all" >Delete all not favourite (f)</option>
          <option value="delete-all" >Delete all not (p) and (f)</option>
        </select>
        <select name="priority" id="priority" className="w-fit bg-amber-100 rounded-sm h-8 px-2" placeholder="Priority">
          <option className="font-bold" selected>Sort by</option>
          <option value="pack-all" >Time</option>
          <option value="pack-all">packed</option>
          <option value="delete-all" >unpacked</option>
          <option value="delete-all" >priority</option>
        </select>
        <label htmlFor="select" className="flex gap-2 ">
        <input type="checkbox" name="select" id="select" />
        <span>select</span>
        </label>
        </div>
        <div className="flex gap-16">
        <ul className="flex flex-col gap-3">
          <Item>Item 1 long</Item>
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
        <div className="h-20 rounded-2xl w-full bg-amber-500 flex items-center mt-4 px-4">
          <span className="font-bold">Stats: </span> You have packed <StatsNumber color={"text-green-500"}>13</StatsNumber> items,
           and <StatsNumber color={"text-amber-400"}>5</StatsNumber> items unpacked, total of <StatsNumber color={"text-blue-500"}>18</StatsNumber>
        </div>
      </div>

      <div className="anim flex flex-col border-l gap-4 p-4 pb-0">
      <AddItemForm />
      {/* <GreenBtn>+ Add Item</GreenBtn> */}
      <div className="bg-amber-300 h-fit rounded-2xl border p-4 flex flex-col gap-3" >
        <h3 className="font-bold">Favourite Items</h3>
        <p>Item 1</p>
        <p>Item 2</p>
        <p>Item 3</p>
        <p>Item 4</p>
      </div>
      </div>
      <Overlay>
        <EditItemForm />
      </Overlay>
    </section>
  )
}
