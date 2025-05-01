
export default function Heading({children}) {
  return (
    <h3 className="text-xl font-bold flex gap-2">
        <div className="rounded-full border size-2"></div>
        {children}</h3>
  )
}
