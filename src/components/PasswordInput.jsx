import { useState } from 'react'

const EyeIcon = ({ visible }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
    {!visible && (
      <line x1="3" y1="3" x2="21" y2="21" stroke="currentColor" strokeWidth="1.5" />
    )}
  </svg>
)

const PasswordInput = ({ label, error, ...rest }) => {
  const [visible, setVisible] = useState(false)

  return (
    <div className={`auth-field-box auth-field-box--password${error ? ' has-error' : ''}`}>
      <span className="auth-field-label">{label}</span>
      <input
        type={visible ? 'text' : 'password'}
        className="auth-field-value"
        {...rest}
      />
      <button
        type="button"
        className={`auth-password-toggle${visible ? ' is-active' : ''}`}
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
      >
        <EyeIcon visible={visible} />
      </button>
    </div>
  )
}

export default PasswordInput
