import { GiBrain } from "react-icons/gi";

export default function Logo() {
  return (
    <div onClick={() => window.location.href = "/"} className="cursor-pointer hover:text-amber-900 flex gap-2 justify-center items-center">
      <span className="text-2xl"><GiBrain /></span>
      <div>i<span className="font-bold">REMEMBER</span></div></div>
  )
}
