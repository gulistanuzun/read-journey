import './AuthLayout.css'

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-panel-content">
          <div className="auth-logo">
            <img className="auth-logo-icon" src="/Logo.png" alt="" />
            <span className="auth-logo-text">READ JOURNEY</span>
          </div>

          <h1 className="auth-headline">
            Expand your mind, reading <span>a book</span>
          </h1>

          {children}
        </div>

        <div className="auth-panel-image">
          <img src="/telefon.png" alt="" />
        </div>

      </div>
    </div>
  )
}

export default AuthLayout
