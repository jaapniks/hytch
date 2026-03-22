import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DesignPage from './DesignPage.jsx'
import HomeScreen from './HomeScreen.jsx'

function Root() {
  const hash = window.location.hash
  if (hash === '#/design') return <DesignPage />
  if (hash === '#/flow') return <App />
  return <HomeScreen />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
