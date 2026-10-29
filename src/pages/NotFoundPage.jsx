import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <main className="container">
      <section className="card">
        <h2>404 — Page not found</h2>
        <p className="muted">Sorry, there’s no page at this address.</p>
        <Link to="/">Go to the home page</Link>
      </section>
    </main>
  )
}

export default NotFoundPage