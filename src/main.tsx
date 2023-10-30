import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { Toaster } from 'react-hot-toast'
import { CountriesProvider } from './context/DataCountryContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CountriesProvider>
      <ThemeProvider>
        <Toaster />
        <App />
      </ThemeProvider>
    </CountriesProvider>
  </React.StrictMode>
)
