import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DesignPage from './DesignPage.jsx'

function Root() {
  const isDesign = window.location.hash === '#/design'
  return isDesign ? <DesignPage /> : <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
