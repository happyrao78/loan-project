import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Navbar from './components/Navbar'
// import LoginPage from './pages/Login'
// import SignupPage from './pages/Signup'
import AuthPage from './pages/AuthPage'
import WebDesign from './pages/WebDesign'
import WebDev from './pages/WebDev'
import AppDev from './pages/AppDev'
import ContactUs from './pages/Contact'
import Form from './pages/Form'
import EmiCalculator from './pages/EmiCalculator'
import TrackLoan from './pages/TrackLoan'

const App = () => {
  return (
    
    <>
       
      
      <Routes>
       
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/web-design' element={<WebDesign />} />
        <Route path='/web-dev' element={<WebDev/>} />
        <Route path='/app-dev' element={<AppDev/>} />
        <Route path='/contact' element={<Contact/>} />

        <Route path='/apply-form' element={<Form/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/emi-calculator' element={<EmiCalculator/>} />
        <Route path='/track-loan' element={<TrackLoan/>} />
        
      </Routes>
      
    </>
  )
}

export default App