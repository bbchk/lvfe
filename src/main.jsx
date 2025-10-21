import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'

import App from '@src/App'
import { store } from '@src/store/store'
import { AuthProvider } from '@src/contexts/AuthContext'

import 'styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@mui/material/styles'

import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

import { enableMapSet } from 'immer'
enableMapSet()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
)

// TODO: remove, not 12 factor
/* eslint-disable */
if (import.meta.env.PROD) {
  console.log = function () {}
  console.warn = function () {}
  console.error = function () {}
}
/* eslint-enable */
