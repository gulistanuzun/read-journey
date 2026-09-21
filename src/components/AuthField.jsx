const AuthField = ({ label, error, ...rest }) => {
  return (
    <div className={`auth-field-box${error ? ' has-error' : ''}`}>
      <span className="auth-field-label">{label}</span>
      <input className="auth-field-value" {...rest} />
    </div>
  )
}

export default AuthField
