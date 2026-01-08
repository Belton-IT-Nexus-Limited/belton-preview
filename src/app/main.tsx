import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AnalyticsProvider } from '../components/analytics/AnalyticsProvider'
import '../i18n/config'
import '../styles/globals.css'
import '../styles/animations.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AnalyticsProvider>
      <App />
    </AnalyticsProvider>
  </React.StrictMode>
)
