import { FaRegStar, FaStar } from "react-icons/fa6";
import { Globalcontext } from "../components/GlobalContext.jsx";
import { useContext, useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";


export default function Favorites() {

  const { favorites, setFavorites, user } = useContext(Globalcontext)
  const [isFavorited, setIsFavorited] = useState(false);
  const { id } = useParams()
  
  const toggleFavorite = () => {
    if (!favorites.some(obj => obj.auction_id === id)) {
      const favorite = { user_id: user.id, auction_id: id }
      saveToApi(favorite)
    } else {
      
    }
  };

  async function saveToApi(data) {
    try {
      const response = await fetch("http://localhost:3000/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      const newFavorites = [...favorites, result];
      setFavorites(newFavorites);
      setIsFavorited(true)    
      console.log("Success ADD to favorites:", result);
    } catch (error) {
      console.error("Error:", error);
    }    
  }

  console.log("Favorites: ", favorites)

  return <>

    <Button variant="link" onClick={toggleFavorite}>
      {isFavorited ? <FaStar color="yellow" /> : <FaRegStar />}
    </Button>

  </>
}