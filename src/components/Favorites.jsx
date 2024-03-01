import { FaRegStar, FaStar } from "react-icons/fa6";
import { Globalcontext } from "../components/GlobalContext.jsx";
import { useContext, useState, useEffect } from "react";
import { Button } from 'react-bootstrap';

/* <FaRegStar /> , <FaStar /> */

export default function Favorites(props) {

  const { favorites, setFavorites } = useContext(Globalcontext)
  const [isFavorited, setIsFavorited] = useState(false);
  const [aunctionId, setAunctionId] = useState({})

  const user_id = 1

  useEffect(() => {
    setAunctionId(props.obj)
  }, [])
  
  useEffect(() => {
    fetch(`http://localhost:3000/favorites?user_id=${user_id}`)
      .then(response => response.json())
      .then(data => {
        setFavorites(data)

        if (data.some(obj => obj.auction_id === aunctionId.id)) {
          console.log("Första")
          setIsFavorited(true)
        } else {
          console.log("Andra")
          setIsFavorited(false)
        }
      })
      .catch(error => console.error("Fel vid laddning av favoriter:", error));
  }, []);



  const toggleFavorite = () => {
    if (!favorites.some(obj => obj.auction_id === aunctionId)) {
      const newFavorites = [...favorites, auction];
      setFavorites(newFavorites);
      setIsFavorited(true)
/*       fetch('http://localhost:3000/favorites', {
        method: 'POST', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify({ id: 1, user_id: 1, auction_id: auction.id }),
      }).then(() => {

      })   */    

    } else {
      setFavorites(favorites.filter(obj => obj.id !== aunctionId))
      setIsFavorited(false)
    }
  };

  console.log("Favorites: ", favorites)

  return <>

    <Button variant="link" onClick={toggleFavorite}>
      {isFavorited ? <FaStar color="yellow" /> : <FaRegStar />}
    </Button>

  </>
}