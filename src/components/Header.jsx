import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../hooks/useAuth.js'
import { useCart } from '../hooks/useCart.js'

function Header() {
  const { count } = useCart()
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  function linkClass({ isActive }) {
    return isActive ? 'link active' : 'link'
  }

  return (
    <header className="header">
      <h1 className="logo">CampusEats</h1>

      <nav className="nav" aria-label="Main navigation">
        <NavLink to="/" end className={linkClass}>
          Vendors
        </NavLink>

        <NavLink to="/orders" className={linkClass}>
          My Orders
        </NavLink>

        <NavLink to="/cart" className={({ isActive }) =>
          isActive ? 'link cart active' : 'link cart'
        }>
          Cart <span className="badge">{count}</span>
        </NavLink>

        {user ? (
          <>
            <button
              type="button"
              className="link"
              onClick={handleLogout}
            >
              Log out
            </button>
          </>
        ) : (
          <NavLink to="/login" className={linkClass}>
            Log in
          </NavLink>
        )}
      </nav>
    </header>
  )
}

export default Header