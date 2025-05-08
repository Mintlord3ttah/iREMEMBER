import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Navigation from './UI/Navigation'
import WelcomeUI from './PAGES/WelcomeUI'
import Application from './PAGES/Application'
import Footer from './UI/Footer'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Overlay from './UI/Overlay'
import DataContextProvider from './context/DataContext'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000
    }
  }
})

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
    <DataContextProvider>
    <BrowserRouter>
      <Navigation />
      {/* <Overlay /> */}
      <Routes>
        <Route element={<WelcomeUI />} path='/' />
        <Route element={<Application />} path='/app' />
      </Routes>
      <Footer />
     </BrowserRouter>
    </DataContextProvider>
    </QueryClientProvider>
  )
}
