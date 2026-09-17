import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import RecommendedPage from './pages/RecommendedPage'
import LibraryPage from './pages/LibraryPage'
import ReadingPage from './pages/ReadingPage'

function App() {
  return (
    <>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/recommended" element={<RecommendedPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/reading" element={<ReadingPage />} />
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
