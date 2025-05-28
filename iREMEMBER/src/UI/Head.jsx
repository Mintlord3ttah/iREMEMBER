
export default function Head({children, heading}) {
  return <div className="flex gap-6 max-[845px]:justify-between border-b pb-4 border-b-amber-400 items-center mb-4 max-[780px]:px-12 max-[715px]:px-4">
            <h3 className="max-[870px]:hidden max-[780px]:block max-[715px]:hidden max-[520px]:block text-2xl font-bold">{heading}</h3>
            {/* <Controllers handleSelect={handleSelect} isSelect={isSelect} setOverlayFormControls={setOverlayFormControls} /> */}
            {children}
          </div>
}
