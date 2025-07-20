import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

const client_id =import.meta.env.VITE_GOOGLE_CLIENT_ID

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={client_id }>
  <StrictMode>
    <App />
  </StrictMode>
  </GoogleOAuthProvider>
);

