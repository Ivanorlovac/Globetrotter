import { FaRegStar, FaStar } from "react-icons/fa6";
import { Globalcontext } from "../components/GlobalContext.jsx";
import { useContext, useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { useParams } from "react-router-dom";


export default function Favorites() {

  const { favorites, setFavorites, user } = useContext(Globalcontext)
  const [isFavorited, setIsFavorited] = useState(false);
  const { id } = useParams()
  

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
      saveToApi(favorite);
    } else {
      removeFromApi(existingFavorite);
    }
  };

  async function saveToApi(data) {
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
        console.log("Success ADD to favorites:", result);        
      }

    } catch (error) {
      console.error("Error:", error);
    }    
  }

  async function removeFromApi(obj) {
    console.log(obj)
    const userId = user.id
    try {
      const response = await fetch("/api/favorites?user_id=" + userId, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj)
      });

      if (response.ok) {
        const updatedFavorites = favorites.filter(obj => obj.auction_id !== id);
        setFavorites(updatedFavorites);
        setIsFavorited(false)        
      }
      return await response.json();

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