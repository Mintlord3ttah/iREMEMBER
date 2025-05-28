export default function RoundedBodyCon({children, w="w-fit"}) {
  return <div className={`flex bg-amber-50 rounded-2xl border p-4 ${w}`}>
    {children}
    </div>
}