import React from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import Navigation from './UI/Navigation'
import WelcomeUI from './PAGES/WelcomeUI'
import Application from './PAGES/Application'
import Footer from './UI/Footer'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { Toaster } from 'react-hot-toast';
import DataContextProvider from './context/DataContext'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Login from './PAGES/Login'
import Signup from './PAGES/Signup'
import Processing from './PAGES/Processing'

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
      <Toaster />
      {/* <Overlay /> */}
      <Routes>
        <Route element={<WelcomeUI />} path='/' />
        <Route element={<Application />} path='/app' />
        <Route element={<Login />} path="/Auth/Login" />
        <Route element={<Signup />} path="/Auth/Signup" />
        <Route element={<Processing />} path="/Processing" />
      </Routes>
      <Footer />
     </BrowserRouter>
    </DataContextProvider>
    </QueryClientProvider>
  )
}
