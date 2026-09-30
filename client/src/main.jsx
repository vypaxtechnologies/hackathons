import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './context/ToastProvider'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Opt in to the v7 behaviours now so the console stays clean and the
        eventual v7 upgrade is a version bump rather than a behavioural change.

        v7_startTransition wraps router state updates in React.startTransition.
        This site navigates between static sections, so the change is safe here
        and keeps updates interruptible.

        v7_relativeSplatPath fixes relative link resolution inside `*` routes.
        Safe because the only splat route is the catch-all below, which
        immediately redirects to `/` using an absolute path. */}
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
)