import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Form from './pages/Form'
import EmiCalculator from './pages/EmiCalculator'
import TrackLoan from './pages/TrackLoan'
import LoanDetail from './pages/LoanDetail'
import Dashboard from './components/Dashboard'

const App = () => {
  return (
    
    <>
       
      
      <Routes>
       
        <Route path='/' element={<Home />} />
        <Route path='/contact' element={<Contact/>} />

        <Route path='/apply-form' element={<Form/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/emi-calculator' element={<EmiCalculator/>} />
        <Route path='/track-loan' element={<TrackLoan/>} />
        <Route path="/about/:loanType" element={<LoanDetail />} />
        <Route path='/dashboard' element={<Dashboard />} />
        
      </Routes>
      
    </>
  )
}

export default App