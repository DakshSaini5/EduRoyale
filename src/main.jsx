import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'     // Loads Tailwind v4 & Theme
import './styles/base.css' // Loads Retro cursors & CRT effects
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)