import './AuthLayout.css'

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 4.5C4 3.67 4.67 3 5.5 3H11v16H5.5A1.5 1.5 0 0 1 4 17.5V4.5Z"
              fill="currentColor"
            />
            <path
              d="M20 4.5c0-.83-.67-1.5-1.5-1.5H13v16h5.5c.83 0 1.5-.67 1.5-1.5V4.5Z"
              fill="currentColor"
              opacity="0.5"
            />
          </svg>
          <span>READ JOURNEY</span>
        </div>

        <h1 className="auth-headline">
          Expand your mind, reading <span>a book</span>
        </h1>

        {children}
      </div>
    </div>
  )
}

export default AuthLayout
