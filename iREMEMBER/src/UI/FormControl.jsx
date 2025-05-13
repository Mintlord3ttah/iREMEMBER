import React from 'react'
import AddItemForm from './AddItemForm'
import GreenBtn from './GreenBtn'

export default function FormControl({setForm, form, setOverlayFormControls}) {
  
  return <>
  {form ? <AddItemForm setForm={setForm} setOverlayFormControls={setOverlayFormControls} /> :
        <GreenBtn onClick={()=>setForm(true)}>+ Add Item</GreenBtn>}
  </>
}
