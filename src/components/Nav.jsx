import { Link } from "react-router-dom"

export default function Nav() {

  return <>
    <br />
    <ul>
      <li className="navlink"><Link to="/" className="mr-4" id="navlink-home">Hem</Link></li>
      <li className="navlink"><Link to="/skapa-auktion" className="mr-4" id="navlink-auction-form">Skapa Auktion</Link></li>
      <li className="navlink"><Link to="/register" className="mr-4" id="navlink-register">Registrera</Link></li>
      <li className="navlink"><Link to="/login" id="navlink-login">Logga in</Link></li>
    </ul>


  </>

}

