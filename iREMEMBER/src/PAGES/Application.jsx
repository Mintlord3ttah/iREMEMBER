import { useEffect, useState } from "react";
import EditItemForm from "../UI/EditItemForm";
import Overlay from "../UI/Overlay";
import { useDataContext } from "../context/DataContext";
import ItemsBoard from "../UI/ItemsBoard";
import Stats from "../UI/Stats";
import FavouriteItems from "../UI/FavouriteItems";
import GeneralMutation from "../UI/GeneralMutation";
import Controllers from "../UI/Controllers";
import FormControl from "../UI/FormControl";
import { getUser, refreshAccessToken } from "../service/getUser";
import ProcessUI from "../UI/ProcessUI";
import { FaListUl } from "react-icons/fa6";
import Head from "../UI/Head";
import LeftContainer from "../UI/LeftContainer";
import RightContainer from "../UI/RightContainer";
import OverlayContainer from "../UI/RightContainerOverlay";
import AppContainer from "../UI/AppContainer";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import Sorts from "../UI/Sorts";
import RightOverlayBoard from "../UI/RightOverlayBoard";
import { useAuthContext } from "../context/AuthContext";

export default function Application() {
  const {select, isEdit, isSelect,setOverlayFormControls,
        displayType, setDisplayType, currentUser} = useDataContext()
  const [form, setForm] = useState(false)
  // const [message, setMessage] = useState(false)
  const {loading} = useAuthContext()

  function handleSelect(e){
    select()
  }

  if(loading || !currentUser?._id) return <ProcessUI />
  return (
    <>
    <AppContainer>
        <LeftContainer>
          <Head heading={"ITEMS"}>
            <Controllers>
              <div className='max-[520px]:hidden'>
                <GeneralMutation />
              </div>

              <div className="max-[350px]:hidden flex gap-4 items-center">
              <Sorts />
              <label htmlFor="selects" className="flex gap-2 border rounded-sm px-2 py-0.5 hover:bg-amber-400 cursor-pointer">
                <input type="checkbox" onClick={handleSelect} defaultChecked={isSelect} id="selects" />
                <span>select</span>
              </label>
              { displayType === "list" ? <button onClick={()=>setDisplayType("grid")} title='list' className='p-1 cursor-pointer hover:bg-amber-400'>
                <FaListUl />
              </button>:
              <button onClick={()=>setDisplayType("list")} title='grid' className='p-1 cursor-pointer hover:bg-amber-400'>
                <BsFillGrid3X3GapFill />
              </button>}
              </div>
            </Controllers>
          </Head>
          <ItemsBoard />
          <Stats />
        </LeftContainer>
      <RightContainer>
        <FormControl setForm={setForm} form={form} setOverlayFormControls={setOverlayFormControls} />
        <FavouriteItems />
      </RightContainer>
      <OverlayContainer>
      {/* <div className={`h-full transition-all duration-[0.8s] w-0 ${OverlayFormControls ? "w-7/12 opacity-100" : "w-0"} bg-amber-50 max-[510px]:w-9/12 max-[780px]:flex flex-col gap-4 p-4`}> */}
        <RightOverlayBoard >
        <div className={`${form && "hidden"} flex flex-col gap-4 pb-3 p-2 border-b border-b-amber-400`}>
          <div className="flex justify-end w-full">
            { displayType === "list" ? <button onClick={()=>setDisplayType("grid")} title='list' className='p-1 cursor-pointer hover:bg-amber-400'>
                <FaListUl />
              </button>:
              <button onClick={()=>setDisplayType("list")} title='grid' className='p-1 cursor-pointer hover:bg-amber-400'>
                <BsFillGrid3X3GapFill />
              </button>}
          </div>
          <GeneralMutation w="w-full" />
          <Sorts />
              <label htmlFor="select" className="flex gap-2 border rounded-sm px-2 py-0.5 hover:bg-amber-400 cursor-pointer">
                <input type="checkbox" onClick={handleSelect} defaultChecked={isSelect} name="select" />
                <span>select</span>
              </label>
              
        </div>
        <FormControl setForm={setForm} form={form} setOverlayFormControls={setOverlayFormControls} />
        <FavouriteItems />
        </RightOverlayBoard>
      </OverlayContainer>
    </AppContainer>
    {isEdit && <Overlay>
        <EditItemForm />
      </Overlay>}
    </>
  )
}