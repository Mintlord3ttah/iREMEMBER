import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef } from 'react'
import { getItems } from '../service/getItems'
import { useDataContext } from '../context/DataContext'
import LandingPage from '../UI/LandingPage'
import { BACKEND_URL } from '../utils/backendSite'

export default function MessageUI() {
  const {openedMessageId, currentUser} = useDataContext()
  const divRef = useRef(null)
  const {data: notification} = useQuery({
    queryKey: ["notifications"],
    queryFn: async ()=> getItems({
      accessToken: currentUser.accessToken,
      id: currentUser._id,
      url: `/notifications?userId=${currentUser._id}&notificationId=${openedMessageId}`
    })
  })
  const openMessage = notification?.find(v=> v._id === openedMessageId)
  
  useEffect(()=>{
    async function setDivWithMesg(){
      if(!openMessage) return
      if(openMessage.status !== "opened"){
      const res = await fetch(BACKEND_URL + `/notifications/notification?notificationId=${openMessage?._id}`, {
        method: "PATCH",
        body: JSON.stringify({status: "opened"}),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser.accessToken}`
        }
      })
      await res.json()
    }

      divRef.current.innerHTML = ""
      divRef.current.insertAdjacentHTML("afterbegin", openMessage.message)
    }
    setDivWithMesg()
  },[openedMessageId])

  if(!openMessage) return <LandingPage />
  return (
    <div className='flex flex-col gap-8 max-[715px]:p-4'>
        <h3 className='font-bold text-xl'>{openMessage?.subject}</h3>
        <div ref={divRef}>
        </div>
    </div>
  )
}
