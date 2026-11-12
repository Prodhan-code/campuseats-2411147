import { useState } from 'react'
import { sendPasswordResetEmail } from 'firebase/auth'
import { Link, useLocation, useNavigate } from 'react-router'
import { auth } from '../firebase.js'
import { useAuth } from '../hooks/useAuth.js'
import { authErrorMessage } from '../authErrors.js'

function LoginPage() {
  const { login, loginWithGoogle } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const goTo = location.state?.from ?? '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [busy, setBusy] = useState(false)
  const [resetBusy, setResetBusy] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')
    setBusy(true)

    try {
      await login(email, password)
      navigate(goTo, { replace: true })
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  async function handleForgotPassword() {
    setError('')
    setMessage('')

    const emailAddress = email.trim()

    if (!emailAddress) {
      setError('Enter your email address first.')
      return
    }

    setResetBusy(true)

    try {
      await sendPasswordResetEmail(auth, emailAddress)
      setMessage('Password reset email sent. Check your inbox.')
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setResetBusy(false)
    }
  }

  async function handleGoogle() {
    setError('')
    setMessage('')

    try {
      await loginWithGoogle()
      navigate(goTo, { replace: true })
    } catch (err) {
      setError(authErrorMessage(err))
    }
  }

  return (
    <section className="auth-page">
      <form className="card form" onSubmit={handleSubmit}>
        <h2>Log in</h2>

        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />

         <button
          type="button"
          className="link auth-link"
          onClick={handleForgotPassword}
          disabled={resetBusy}
        >
          {resetBusy ? 'Sending…' : 'Forgot password?'}
        </button>

        {error && (
          <p className="field-error" role="alert">
            {error}
          </p>
        )}

        {message && (
          <p className="success-message" role="status">
            {message}
          </p>
        )}

        <button type="submit" className="btn" disabled={busy}>
          {busy ? 'Logging in…' : 'Log in'}
        </button>

        <button
          type="button"
          className="btn btn-outline"
          onClick={handleGoogle}
        >
          Continue with Google
        </button>

        <p className="muted">
          No account?{' '}
          <Link to="/register" state={location.state}>
            Register
          </Link>
        </p>
      </form>
    </section>
  )
}

export default LoginPage