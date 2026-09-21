import { useSelector } from 'react-redux'
import './Header.css'

const Header = ({ onMenuClick }) => {
  const name = useSelector((state) => state.auth.user.name)
  const initial = name ? name.charAt(0).toUpperCase() : ''

  return (
    <header className="app-header">
      <img className="app-header-logo" src="/Logo.png" alt="Read Journey" />
      <div className="app-header-actions">
        <button className="app-header-user" type="button">
          {initial}
        </button>
        <button className="app-header-menu" type="button" onClick={onMenuClick}>
          <img src="/menu-04.svg" alt="Menu" width={28} height={28} />
        </button>
      </div>
    </header>
  )
}

export default Header
