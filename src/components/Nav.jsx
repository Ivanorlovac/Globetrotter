import { Link } from "react-router-dom"

export default function Nav() {

  return <>
    <br/>
    <ul>
      <li><Link to="/" className="mr-4">Hem</Link></li>
      <li><Link to="/skapa-auktion" className="mr-4">Skapa Auktion</Link></li>
      <li><Link to="/register" className="mr-4">Registrera</Link></li>
      <li><Link to="/login">Logga in</Link></li>
    </ul>

    
  </>
  
}

