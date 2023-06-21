import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store  from "./Features/Store.jsx"
import { HMSRoomProvider } from "@100mslive/react-sdk";
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HMSRoomProvider>
  <Provider store={store}> 
    <App />
    </Provider> 
    </HMSRoomProvider>
  </React.StrictMode>,
)


