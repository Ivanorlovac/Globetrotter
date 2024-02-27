import { Link } from "react-router-dom"

export default function Nav() {

  return <>
    <Link to="/" className="mr-4">Hem</Link>
    <Link to="/skapa-auktion" className="mr-4">Skapa Auktion</Link>
    <Link to="/register" className="mr-4">Registrera</Link>
    <Link to="/login">Logga in</Link>
  </>
}

