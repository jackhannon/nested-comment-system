import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles.css'
import { BrowserRouter } from "react-router-dom"
import { Auth0Provider } from '@auth0/auth0-react';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-q036a1lkecpa2kx0.us.auth0.com"
      clientId="YB7hfzin4hBSuI8uVFQTx2CycPbxBYXB"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "http://localhost:5001",
      }}

    >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>,
)
