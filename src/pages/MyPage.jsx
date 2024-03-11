import { useContext, useState, useEffect } from "react"
import { Globalcontext } from "../components/GlobalContext.jsx"
export default function MyPage() {

  const { favorites } = useContext(Globalcontext)
  const [showFavorites, setShowFavorites] = useState(false);
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
  }, []);


  console.log("Favorites: ", favorites)

  return <>

    <div className="my-page-main">
      <section>

      </section>
      <section>
        <div className="favorite-section">
          <h3 className="faqQuestion" onClick={favoritesPopdown}>My favorites</h3>
          {!showFavorites && <p className="show-favorites"> heej</p>}
        </div>
        <div className="my-bids-section">

        </div>
      </section>
    </div>



  </>
}