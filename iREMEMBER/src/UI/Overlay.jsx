import { useDataContext } from "../context/DataContext"

export default function Overlay({children}) {
  const {edit, setIsFavourite} = useDataContext()

  function handleOverlay(e){
    const overlay = e.target.classList.contains("overlay")
    if(overlay){ 
      edit() // return overlay
      setIsFavourite("0")
      }
  }
  return (
    <div onClick={handleOverlay} className="overlay absolute top-0 left-0 flex justify-center items-center w-full h-full">{children}</div>
  )
}
