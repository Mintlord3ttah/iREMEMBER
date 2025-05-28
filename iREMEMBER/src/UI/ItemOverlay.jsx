
export default function ItemOverlay({children}) {
  return <div className="item-overlay absolute top-0 left-0 w-full h-full z-10 flex items-center justify-end gap-4 pr-4">
        {children}
    </div>
}
