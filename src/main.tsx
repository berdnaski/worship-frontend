import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './global.css';
import { router } from './App.tsx';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { Toaster } from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Toaster richColors />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
