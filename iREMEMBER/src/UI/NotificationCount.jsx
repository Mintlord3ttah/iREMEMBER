import React from 'react'
import { useDataContext } from '../context/DataContext'
import { useQuery } from '@tanstack/react-query'
import { getItems } from '../service/getItems'

export default function NotificationCount() {
    const {currentUser} = useDataContext()
      const {isLoading, data} = useQuery({
        queryKey: ["notifications"],
        queryFn: async () => getItems({
          accessToken: currentUser.accessToken,
          id: currentUser._id,
          url: `/notifications?userId=${currentUser._id}`
        })
    })
    const notifications = data?.data?.notifications
  if(!notifications) return
  return <div>{notifications.length}</div>
}
