import { FaRegStar, FaStar } from "react-icons/fa6";
import { Globalcontext } from "../components/GlobalContext.jsx";
import { useContext, useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";


export default function Favorites() {

  const { favorites, setFavorites, user } = useContext(Globalcontext)
  const [isFavorited, setIsFavorited] = useState(false);
  const { id } = useParams()
  
  if (Object.keys(user).length === 0) {
    return
  }


  useEffect(() => {
    if (favorites.some(obj => obj.auction_id === id)) {
      setIsFavorited(true)
    } else {
      setIsFavorited(false)
    }
  },[])

  const toggleFavorite = () => {
    const existingFavorite = favorites.find(obj => obj.auction_id === id);
    if (!existingFavorite) {
      const favorite = { user_id: user.id, auction_id: id };
      saveFavorite(favorite);
    } else {
      deleteFavorite(existingFavorite);
    }
  };

  async function saveFavorite(data) {
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        const newFavorites = [...favorites, result];
        setFavorites(newFavorites);
        setIsFavorited(true)
      }

    } catch (error) {
      console.error("Error:", error);
    }    
  }

  const deleteFavorite = favoriteObj => {

    fetch(`/api/favorites/${favoriteObj.id}`, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(() => {
        const updatedFavorites = favorites.filter(obj => obj.auction_id !== id);
        setFavorites(updatedFavorites);
        setIsFavorited(false) 
      })
  }

  return <>
    <Button variant="link" onClick={toggleFavorite} className="d-flex" style={{height:"100%", width: "auto"}}>
      {isFavorited ? <FaStar color="yellow" style={{ fontSize: "25px" }} /> : <FaRegStar className="align-items-end" style={{ color: "#212529", fontSize: "25px"}}/>}
    </Button>
  </>
}