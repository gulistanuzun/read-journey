import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { store } from './redux/store.js'
import { setAuthHeader } from './services/api.js'

const persistedAuth = JSON.parse(localStorage.getItem('auth'))
if (persistedAuth?.token) {
  setAuthHeader(persistedAuth.token)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
