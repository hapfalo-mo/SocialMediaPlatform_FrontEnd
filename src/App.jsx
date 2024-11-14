
import './App.css'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import HomePage from './pages/HomePage'
import RegisterFavorite from './pages/RegisterFavorite'
import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
function App() {
  return (
    <>
      {/* <ToastContainer /> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/register-favorite' element={<RegisterFavorite />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
