
export default function LeftContainer({children}) {
  return (
    <div className="relative flex flex-col gap-4 w-full p-8 max-[715px]:px-0 pr-0"> {/**px-8 */}
        {children}
    </div>
  )
}
