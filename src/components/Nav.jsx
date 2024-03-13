import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Globalcontext } from "./GlobalContext"; 
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const { user, logout } = useContext(Globalcontext);
  const navigate = useNavigate()

  const logoutClicked = () => {
    logout()
    navigate("/")
  }

  return (
    <>
      <br />
      <ul>
        <li className="navlink"><Link to="/" className="mr-4" id="navlink-home">Hem</Link></li>
        <li className="navlink"><Link to="/alla-auktioner" id="navlink-see-all">Se alla auktioner</Link></li>
        {user.role === 'seller' && (
          <>
            <li className="navlink"><Link to="/skapa-auktion" className="mr-4" id="navlink-auction-form">Skapa Auktion</Link></li>
            <li className="navlink"><Link to="/sellerspage" className="mr-4" id="navlink-my-auctions">Mina Auktioner</Link></li>
            <li className="navlink"><Link to="/seller-profile" id="navlink-seller-profile">Profil Säljare</Link></li>
            <li className="navlink" onClick={logoutClicked} id="navlink-logout">Logga ut</li>
          </>
        )}
        {user.role === 'user' && (
          <>
            <li className="navlink"><Link to="/mina-sidor" className="mr-4" id="navlink-my-page">Mina sidor</Link></li>
            <li className="navlink" onClick={logoutClicked} id="navlink-logout">Logga ut</li>
          </>
        )}
        {Object.keys(user).length === 0 && (
          <>
            <li className="navlink"><Link to="/register" className="mr-4" id="navlink-register">Registrera</Link></li>
            <li className="navlink"><Link to="/login" id="navlink-login">Logga in</Link></li>
          </>
        )}
      </ul>
    </>
  );
}