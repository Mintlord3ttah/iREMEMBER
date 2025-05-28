import React from 'react'

export default function RightContainer({children}) {
  return <div className="p-8 pl-0 h-full max-[780px]:hidden max-[780px]:h-0">
        <div className="flex flex-col border-l gap-4 p-4 pb-0 h-full">
        {/* <FormControl setForm={setForm} form={form} setOverlayFormControls={setOverlayFormControls} />
        <FavouriteItems /> */}
        {children}
        </div>
        </div>
}
