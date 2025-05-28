import { MdMenuOpen } from "react-icons/md";
import { useDataContext } from '../context/DataContext';

export default function Controllers({children}) {
  const {setOverlayFormControls} = useDataContext()
  return <>
    {children}
    <div className='hidden max-[780px]:flex grow-1 justify-end'>
    <button onClick={()=>setOverlayFormControls(true)} className='text-2xl cursor-pointer hover:bg-amber-400'>
        <MdMenuOpen />
    </button>
    </div>
    
  </>
}
