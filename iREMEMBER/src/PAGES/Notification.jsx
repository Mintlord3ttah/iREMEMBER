import { useEffect, useState } from "react";
import AppContainer from '../UI/AppContainer'
import Head from '../UI/Head'
import LeftContainer from '../UI/LeftContainer'
import RightContainer from '../UI/RightContainer'
import OverlayContainer from '../UI/RightContainerOverlay'
import Controllers from '../UI/Controllers'
import RightOverlayBoard from '../UI/RightOverlayBoard'
import Notifications from '../UI/Notifications'
import toast from 'react-hot-toast'
import { ImCalendar } from "react-icons/im";
import SwitchBtn from '../UI/NotificationBtn'
import { Outlet, useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataContext";
import GenLoader from "../UI/GenLoader";

export default function NotificationUI() {
    const navigate = useNavigate()
    const [notification, SetNotification] = useState(true)
    const {getNotifications, currentUser} = useDataContext()
    
    useEffect(()=>{!notification && toast("You will no longer receive notifications about relevant events")},[notification])
    
    if(!currentUser?._id) return <div className="w-full h-screen flex flex-col items-center justify-center">
       <GenLoader />
       <p className="text-2xl">Loading...</p>
    </div> 
    return <AppContainer>
    <LeftContainer>
        <Head heading={<p onClick={()=>navigate("/app/notifications")} className="hover:text-amber-600 cursor-pointer text-xl">Notification</p>} >
            <Controllers>
                <SwitchBtn setValue={SetNotification} value={notification} />
                <button onClick={()=>navigate("/app/notifications/set")} title='Schedule calender' className='p-2 hover:bg-amber-400 text-xl cursor-pointer'>
                    <ImCalendar />
                </button>
                <button onClick={()=>navigate("/app")} className="bg-amber-400 hover:bg-amber-500 cursor-pointer rounded-sm px-2.5 max-[490px]:hidden">&larr; Back</button>
                <button onClick={()=>navigate("/app")} className="size-8 rounded-full bg-gray-900 cursor-pointer hover:bg-gray-950 min-[490px]:hidden text-gray-50 font-bold flex justify-center items-center max-[490px]:block">&larr;</button>
            </Controllers>
        </Head>
        <Outlet />
    </LeftContainer>
    <RightContainer>
        <Notifications />
    </RightContainer>
    <OverlayContainer>
        <RightOverlayBoard>
            <Notifications />
        </RightOverlayBoard>
    </OverlayContainer>
  </AppContainer>
}

