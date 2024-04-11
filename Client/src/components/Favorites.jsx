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
    console.log("favorites start: ", favorites)

    if (favorites.some(obj => obj.auctionId === id)) {
      setIsFavorited(true)
    } else {
      setIsFavorited(false)
    }
  },[])

  const toggleFavorite = () => {    
    let existingFavorite = favorites.find(obj => obj.auctionId === id);
    console.log("existingFavorite: ", existingFavorite)
    
    console.log("favorites: ", favorites)
    if (favorites.length === 0) {
      existingFavorite = []
    }

    if (existingFavorite.length === 0) {
      console.log("Första")
      const favorite = { userId: user.id, auctionId: id };
      saveFavorite(favorite);
    } else {
      console.log("Andra: ", existingFavorite)
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

      if (response) {
        const newFavorites = [...favorites, data];
        setFavorites(newFavorites);
        setIsFavorited(true)
      }

    } catch (error) {
      console.error("Error:", error);
    }    
  }

  const deleteFavorite = favoriteObj => {
    console.log("favoriteObj: ", favoriteObj)

    fetch(`/api/favorites/${favoriteObj.userId}/${favoriteObj.auctionId}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedFavorites = favorites.filter(obj => obj.auctionId !== id);
        setFavorites(updatedFavorites);
        setIsFavorited(false) 
      })
  }

  return <>
    {Object.keys(user).length !== 0 ? <Button variant="link" onClick={toggleFavorite} className="d-flex" style={{ height: "100%", width: "auto" }}>
      {isFavorited ? <FaStar color="yellow" style={{ fontSize: "25px" }} /> : <FaRegStar className="align-items-end" style={{ color: "#212529", fontSize: "25px" }} />}
    </Button> : <></>}

  </>
}