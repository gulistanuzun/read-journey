import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { loginUser } from '../services/authService'
import { setAuthHeader } from '../services/api'
import { setCredentials } from '../redux/auth/authSlice'
import AuthLayout from '../components/AuthLayout'
import AuthField from '../components/AuthField'
import PasswordInput from '../components/PasswordInput'

const schema = yup.object({
  email: yup
    .string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Email is not valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),
})

const LoginPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data)
      setAuthHeader(result.token)
      dispatch(setCredentials(result))
      navigate('/recommended')
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed. Please try again.'
      toast.error(message)
    }
  }

  return (
    <AuthLayout>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-fields">
          <div>
            <AuthField
              label="Mail:"
              type="email"
              placeholder="Your@email.com"
              error={!!errors.email}
              {...register('email')}
            />
            {errors.email && (
              <p className="auth-error">{errors.email.message}</p>
            )}
          </div>
          <div>
            <PasswordInput
              label="Password:"
              placeholder="Yourpasswordhere"
              error={!!errors.password}
              {...register('password')}
            />
            {errors.password && (
              <p className="auth-error">{errors.password.message}</p>
            )}
          </div>
          <div className="auth-field-box auth-field-box--ghost" aria-hidden="true" />
        </div>
        <div className="auth-actions">
          <button className="auth-submit" type="submit">
            Log In
          </button>
          <Link className="auth-switch-link" to="/register">
            Don't have an account?
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default LoginPage
