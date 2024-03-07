import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import BackgroundSyncClosedAuctions from './components/ClosedAuctions.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BackgroundSyncClosedAuctions/> */}
    <App />
  </React.StrictMode>,
)

