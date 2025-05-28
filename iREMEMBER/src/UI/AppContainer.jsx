import React from 'react'
import { useDataContext } from '../context/DataContext'
import { useQuery } from '@tanstack/react-query'
import { getItems } from '../service/getItems'

export default function AppContainer({children}) {
  const {currentUser} = useDataContext()

  return <section className="relative grid grid-cols-[1fr_308px] max-[780px]:grid-cols-1 overflow-hidden max-[780px]:grid-rows-1 gap-4 max-w-[60rem] bg-amber-200 m-auto min-h-[584px]">
        {children}
    </section>
}
