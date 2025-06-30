import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import AuthProvider from './context/AuthProvider.jsx'
import { NotificationProvider } from './context/NotificationContext.jsx'
import Toast from './components/CompOther/Toast.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider>
      <AuthProvider>
        <App />
        <Toast />
      </AuthProvider>
    </NotificationProvider>
  </React.StrictMode>,
)
