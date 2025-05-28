import { useNavigate } from 'react-router-dom'
import ItemOverlay from './ItemOverlay'
import DelteItem from './DelteItem'
import { useDataContext } from '../context/DataContext'

export default function Message({message, children}){
  const {currentUser, setOpenedMessageId, openedMessageId} = useDataContext()
    const navigate = useNavigate()
    const unread = message.status === "unread" || message.status === "pending"
    
    function handleMessageClick(){
      setOpenedMessageId(message._id)
      navigate("/app/notifications/message")
    }

  return <div className={`listItem ${openedMessageId === message._id && "bg-amber-300/40"} flex p-2.5 items-center gap-2  relative  border-t border-t-amber-300 cursor-pointer text-sm`}>
    {unread && <span className={`text-4xl ${message.status === "unread" ? "text-red-600" : message.status === "pending" ? "text-blue-600" : ""}`}>&#x2022;</span>}
  <div className={` ${unread && "font-bold"} flex flex-col`}>
    Message: {children}
    <p className='text-sm font-light'>{message.date} {message.time}</p>
    </div>
    <ItemOverlay>
        <div className='h-full flex-1' onClick={handleMessageClick}></div>
        <DelteItem ignore={true} url={`/notifications/notification?userId=${currentUser._id}&notificationId=${message._id}`} />
    </ItemOverlay>
  </div> 
}
