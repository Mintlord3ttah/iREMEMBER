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
import NotificationUI from './PAGES/Notification'
import NotificationLandingPage from './PAGES/NotificationLandingPage'
import MessageUI from './PAGES/MessageUI'
import CalenderUI from './PAGES/CalenderUI'
import { RefreshTokensProvider } from './context/AuthContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
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
      <Routes>
        <Route element={<WelcomeUI />} path='/' />
        <Route element={<Signup />} path="/auth/signup" />
        <Route element={<Login />} path="/auth/login" />
        <Route element={<Processing />} path="/auth/processing" />
        <Route element={<RefreshTokensProvider />} path='/app'>
          <Route index element={<Application />} />
          <Route element={<NotificationUI />} path='/app/notifications'>
            <Route element={<NotificationLandingPage />} path='/app/notifications' />
            <Route element={<MessageUI />} path='/app/notifications/message' />
            <Route element={<CalenderUI />} path='/app/notifications/set' />
          </Route>
        </Route>
      </Routes>
      <Footer />
     </BrowserRouter>
    </DataContextProvider>
    </QueryClientProvider>
  )
}
