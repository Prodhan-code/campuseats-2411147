import { Outlet } from 'react-router'
import Header from './Header.jsx'
import Footer from './Footer.jsx'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout