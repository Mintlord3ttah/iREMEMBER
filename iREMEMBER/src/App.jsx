import React from 'react'
import Navigation from './UI/Navigation'
import WelcomeUI from './PAGES/WelcomeUI'
import Application from './PAGES/Application'
import Footer from './UI/Footer'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Overlay from './UI/Overlay'
import DataContextProvider from './context/DataContext'

export default function App() {
  return (
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
  )
}
