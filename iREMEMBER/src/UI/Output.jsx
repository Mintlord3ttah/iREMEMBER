import { useState } from 'react'

export default function Output({permit, label, children, buttons}){
    return <>
    {permit && <div className='flex gap-7 items-center'>
            <div className='flex gap-2'>
            <p className='font-bold'>{label}:</p>
            <p>{children}</p>
            </div>
            {buttons}
        </div>}
    </>
}
