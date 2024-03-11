import { useContext, useState, useEffect } from "react"
import { Globalcontext } from "../components/GlobalContext.jsx"
import Carousel from "../components/Carousel.jsx";
import Timer from "../components/Timer.jsx";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";



export default function MyPage() {

  const { favorites } = useContext(Globalcontext)
  const [showFavorites, setShowFavorites] = useState(true);
  const [filteredAuctions, setFilteredAuctions] = useState([]);



  const favoritesPopdown = () => {
    if (showFavorites) {
      setShowFavorites(false)
    } else {
      setShowFavorites(true)
    }
  };


  useEffect(() => {

    if (!favorites) {
      return
    }

    fetch('http://localhost:3000/auctions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Något gick fel vid hämtning av auktioner');
        }
        return response.json();
      })
      .then(data => {

        data = data.filter(auction => {
          let timeNow = new Date().toLocaleString('se-SE', { timeZone: 'cet' })
          let timeEnd = new Date(auction.endTime).toLocaleString('se-SE', { timeZone: 'cet' })
          return timeNow < timeEnd
        })

        data = data.sort((a, b) => {
          return new Date(a.endTime) - new Date(b.endTime)
        })


        data = data.filter(auction => {
          return favorites.some(favorite => {
            return favorite.auction_id === auction.id
          })
        })


        setFilteredAuctions(data);
      })
      .catch(error => console.error('Fel:', error));
  }, [favorites]);


  console.log("Favorites: ", favorites)

  const ShowFavorites = () => {
    return <>
      {filteredAuctions.map(favorite => (
        <article className="favorite-article">
          <div className="favorite-picture">
            <Carousel objImages={favorite.images} />
          </div>
          <div className="favorite-information">
            <h3>{favorite.title}</h3>
            <p>Kategori: {favorite.category}</p>
            <p>Värdering pris: {favorite.valuationPrice}</p>
            <div>
              <p>Sluttid: </p>
              <Timer objEndTime={favorite.endTime} fontSize={10} showBorder={false} setBold={true} />
            </div>
          </div>
          <div className="favorite-my-bid">

          </div>
        </article>
    ))}
    </>
  }

  return <>

    <div className="my-page-main">
      <section>

      </section>
      <section>
        <div className="favorite-section">
          <h3 className="favorite-drop-button" onClick={favoritesPopdown}>My favorites</h3>
          {showFavorites ? <IoMdArrowDropdown style={{ fontSize: "30px" }} /> : <IoMdArrowDropup style={{ fontSize: "30px" }} />}
        </div>
          {!showFavorites && <ShowFavorites />}
        <div className="my-bids-section">
 
        </div>
      </section>
    </div>



  </>
}