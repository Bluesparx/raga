import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { AuthProvider } from './utils/authProvider.jsx'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
