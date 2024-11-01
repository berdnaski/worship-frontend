import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './global.css'
import { router} from './App.tsx'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
