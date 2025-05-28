import React from 'react'
import { useDataContext } from '../context/DataContext'
import { useQueries } from '@tanstack/react-query'
import { getItems } from '../service/getItems'

export default function NotificationCount() {
    const {currentUser} = useDataContext()
      const {isLoading, data: notifications} = useQueries({
        queryKey: ["notifications"],
        queryFn: async () => getItems({
          accessToken: currentUser.accessToken,
          id: currentUser._id,
          url: `/notifications?userId=${currentUser._id}`
        })
    })
    console.log({notifications})
    return null
//   if(!notifications[0]?._id) return
//   return <div></div>
}
