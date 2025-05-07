import { useDataContext } from "../context/DataContext";
import Flag from "./Flag";

export default function Item({children}) {
  const {isSelect} = useDataContext()

  return (
    <div className="tooltip">
        <li className="hover:bg-amber-400 bg px-4 cursor-pointer flex items-center gap-3 rounded-2xl">
          {isSelect && <input type="checkbox" name="select" id="select" />}
          <div className="flex gap-1 items-center w-8">
            <Flag color={"text-yellow-500"} type={"status"} /> {/* STATUS: packed || unpacked */}
            <Flag color={"text-amber-800"} type={"priority"} />
            <Flag type={"favourite"} />
            </div>
          {children}
        </li>
        <div className="tooltip-text flex flex-col gap-3">
            <p><span className="font-bold">Purpose:</span> This to brush my mouth every morining</p>
            <p><span className="font-bold">Priority:</span> <span className="text-amber-600">Mid high</span></p>
            <p className="flex gap-1 items-center"><span className="font-bold">Count:</span> 3 &#x2022; 
              <span className="text-yellow-500 flex gap-1 items-center">unpacked <input type="checkbox" name="pack" id="pack" /></span>
            </p>
        </div>
    </div>
  )
}
