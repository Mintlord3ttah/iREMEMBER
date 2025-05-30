import { useDataContext } from '../context/DataContext'
import { getItems } from '../service/getItems'
import GenLoader from './GenLoader'
import Message from './Message'
import { useQuery } from '@tanstack/react-query'

export default function Notifications() {
    const {currentUser} = useDataContext()

        const {isLoading, data: notifications} = useQuery({
              queryKey: ["notifications"],
              queryFn: async () => getItems({
                accessToken: currentUser.accessToken,
                id: currentUser._id,
                url: `/notifications?userId=${currentUser._id}`
              })
          })
          console.log(notifications)
  if(!notifications) return <div className='w-full h-full'>
    <GenLoader />
  </div>
  return (
    <div className='flex flex-col gap-7'>
        <h3 className='font-bold'>Notifications</h3>
        <div className='flex flex-col'>
            {notifications?.length ? notifications?.map((v,i)=>{
                return (
            <Message message={v} key={i}>
                {v.subject ? v.subject : "Message has no heading"}
            </Message>
                )
            }) : <p className='text-amber-600'>No notifications found</p>}
        </div>
    </div>
  )
}

