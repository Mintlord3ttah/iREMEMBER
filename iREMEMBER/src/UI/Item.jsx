
export default function Item({children}) {
  return (
    <div className="tooltip">
        <li className="hover:bg-amber-400 px-4 cursor-pointer  rounded-2xl">{children}</li>
        <div className="tooltip-text flex flex-col gap-3">
            <p>Purpose: This to brush my mouth every morining</p>
            <p className="flex gap-1 items-center">Count: 3 &#x2022; 
              <span className="text-green-500 flex gap-1 items-center">packed <input type="checkbox" name="pack" id="pack" /></span>
            </p>
        </div>
    </div>
  )
}
