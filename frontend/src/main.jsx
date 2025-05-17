import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { AuthProvider } from "./AuthContext.jsx"
import HackRxComponent from './components/Block.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
        {/* <HackRxComponent /> */}
      </AuthProvider>
    {/* <App /> */}
    </BrowserRouter>
    
  </StrictMode>,
)
