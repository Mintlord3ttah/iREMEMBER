
export default function RoundedOutskirt({children, w="w-fit"}) {
  return <div className={`flex flex-col gap-3 pt-3 rounded-2xl border ${w} bg-amber-700`}>
    {children}
    </div>
}
