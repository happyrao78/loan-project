import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import ListBank from './pages/ListBank'
import Login from './components/Login'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/ReactToastify.css';
import ApplicationForm from './components/Application'
import ApplicationDisplay from './pages/ApplicationDisplay'
import ApplicationDetail from './pages/DetailedApplication'
import DisplayEvents from './pages/DisplayEvents'
import AddEvent from './pages/AddEvent'
import EditBank from './pages/EditBank'
import LoanApplication from './pages/LoanApplication'
import EditLoanApplication from './pages/EditApplication'
import Partners from './pages/Partners'
// import Feedback from '../../backend/models/feedbackModel'
import Feedbacks from './pages/Feedbacks'


// export const backendUrl = "https://loan-project-backend.onrender.com";
export const backendUrl = "http://localhost:5000";
export const currency = "₹ ";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"");
  useEffect(()=>{
    localStorage.setItem("token",token)
  },[token])
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      {token === "" ? <Login setToken={setToken}/> :
        <>
          <Navbar setToken={setToken}/>
          <hr />
          <div className='flex w-full'>
            <Sidebar />
            <div className='w-[70%] mx-auto ml-[max](vw,25px) my-8 text-gray-600 text-base'>
              <Routes>
                <Route path="/add" element={<Add token={token}/>} />
                <Route path="/listbanks" element={<ListBank token={token}/>} />
                <Route path="/edit-bank/:bankId" element={<EditBank />} />
                <Route path="/applications" element={<ApplicationDisplay token={token}/>} />
                <Route path="/application/:id" element={<ApplicationDetail />} />
                <Route path="/apply" element={<ApplicationForm token={token}/>} />
                <Route path="/addEvent" element={<AddEvent token={token}/>} />
                <Route path="/listEvent" element={<DisplayEvents token={token}/>} />
                <Route path="/loan-applications" element={<LoanApplication token={token}/>} />
                <Route path="/edit-application/:id" element={<EditLoanApplication />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/feedbacks" element={<Feedbacks />} />
              </Routes>
            </div>
          </div>
        </>}
    </div>
  )
}

export default App