import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { registerUser } from '../services/authService'
import { setAuthHeader } from '../services/api'
import { setCredentials } from '../redux/auth/authSlice'
import AuthLayout from '../components/AuthLayout'
import AuthField from '../components/AuthField'
import PasswordInput from '../components/PasswordInput'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .matches(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/, 'Email is not valid')
    .required('Email is required'),
  password: yup
    .string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),
})

const RegisterPage = () => {
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
      const result = await registerUser(data)
      setAuthHeader(result.token)
      dispatch(setCredentials(result))
      navigate('/recommended')
    } catch (error) {
      const message =
        error.response?.data?.message || 'Registration failed. Please try again.'
      toast.error(message)
    }
  }

  return (
    <AuthLayout>
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="auth-fields">
          <div>
            <AuthField
              label="Name:"
              type="text"
              placeholder="Ilona Ratushniak"
              error={!!errors.name}
              {...register('name')}
            />
            {errors.name && <p className="auth-error">{errors.name.message}</p>}
          </div>
          <div>
            <AuthField
              label="Mail:"
              type="email"
              placeholder="Your@email.com"
              error={!!errors.email}
              {...register('email')}
            />
            {errors.email && <p className="auth-error">{errors.email.message}</p>}
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
        </div>
        <div className="auth-actions">
          <button className="auth-submit" type="submit">
            Registration
          </button>
          <Link className="auth-switch-link" to="/login">
            Already have an account?
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
