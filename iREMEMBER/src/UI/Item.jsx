
export default function Item({children}) {
  return (
    <div className="tooltip">
        <li className="hover:bg-amber-400 px-4 cursor-pointer  rounded-2xl">{children}</li>
        <div className="tooltip-text flex flex-col gap-3">
            <p>Purpose: This to brush my mouth every morining</p>
            <p>Count: 3</p>
        </div>
    </div>
  )
}
