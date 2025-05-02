
export default function Overlay({children}) {
  return (
    <div className="overlay absolute top-0 left-0 flex justify-center items-center w-full h-full">{children}</div>
  )
}
