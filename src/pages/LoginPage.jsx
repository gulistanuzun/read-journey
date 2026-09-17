import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { loginUser } from '../services/authService'
import { setAuthHeader } from '../services/api'
import { setCredentials } from '../redux/auth/authSlice'

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
    <div>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input type="email" placeholder="Email" {...register('email')} />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit">Log In</button>
      </form>
      <Link to="/register">Don't have an account?</Link>
    </div>
  )
}

export default LoginPage
