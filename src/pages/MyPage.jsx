import { useContext, useState } from "react"
import { Globalcontext } from "../components/GlobalContext.jsx"

export default function MyPage() {
  
  const { favorites } = useContext(Globalcontext)
  const [showFavorites, setShowFavorites] = useState(false);

  const favoritesPopdown = () => {
    if (showFavorites) {
      setShowFavorites(false)
    } else {
      setShowFavorites(true)
    }
  }; 

  console.log("Favorites: ", favorites)

  return <>
    <li key={"fav"}>
      <h3 className="faqQuestion" onClick={favoritesPopdown}>My favorites</h3>
      {!showFavorites && <p className="show-favorites"> heej</p>}
    </li>
  
  
  </>
}