import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MegaApplication from './MegaApplication.jsx'
import SkipApplication from './SkipApplication.jsx'
import VideoCallingApplication from './VideoCallingApplication.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VideoCallingApplication />
  </StrictMode>,
)
