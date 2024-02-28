import { Link } from "react-router-dom"

export default function Nav() {

  return <>
    <br/>
    <ul>
      <li className="navlink"><Link to="/" className="mr-4" id="navlink">Hem</Link></li>
      <li className="navlink"><Link to="/skapa-auktion" className="mr-4" id="navlink">Skapa Auktion</Link></li>
      <li className="navlink"><Link to="/register" className="mr-4" id="navlink">Registrera</Link></li>
      <li className="navlink"><Link to="/login" id="navlink">Logga in</Link></li>
    </ul>

    
  </>
  
}

