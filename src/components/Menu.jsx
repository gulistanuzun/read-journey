import { FiX } from 'react-icons/fi'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearAuthHeader } from '../services/api'
import { clearCredentials } from '../redux/auth/authSlice'
import './Menu.css'

const Menu = ({ isOpen, onClose }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    clearAuthHeader()
    dispatch(clearCredentials())
    onClose()
    navigate('/login')
  }

  if (!isOpen) return null

  return (
    <div className="menu-overlay">
      <div className="menu-panel">
        <button className="menu-close" type="button" onClick={onClose}>
          <FiX size={22} />
        </button>
        <nav className="menu-nav">
          <NavLink
            className="menu-link"
            to="/recommended"
            onClick={onClose}
          >
            Home
          </NavLink>
          <NavLink
            className="menu-link"
            to="/library"
            onClick={onClose}
          >
            My library
          </NavLink>
        </nav>
        <button className="menu-logout" type="button" onClick={handleLogout}>
          Log out
        </button>
      </div>
    </div>
  )
}

export default Menu
