import { useContext, useState, useEffect } from "react"
import { Globalcontext } from "../components/GlobalContext.jsx"
import Carousel from "../components/Carousel.jsx";
import Timer from "../components/Timer.jsx";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";



export default function MyPage() {

  const { favorites, setFavorites, user } = useContext(Globalcontext)
  const [showFavorites, setShowFavorites] = useState(true);
  const [showAuctions, setShowAuctions] = useState(true);
  const [showEndedAuctions, setShowEndedAuctions] = useState(true);
  const [myAuctions, setMyAuctions] = useState([])
  const [myBids, setMybids] = useState([])
  const [filteredFavoriteAuctions, setFilteredFavoriteAuctions] = useState([]);


  useEffect(() => {
    async function load() {
      const id = user.id

      async function getMyBids() {
        const response = await fetch('/api/bids?userId=' + id)
        const data = await response.json()
        return data
      }
      async function getAuctions() {
        const response = await fetch('/api/auctions')
        const data = await response.json()
        return data 
      }

      const dataBids = await getMyBids()
      const dataAuctions = await getAuctions()

      if (dataBids && dataAuctions) {

        let myAuctionsData = dataAuctions.filter(auction => {
          return dataBids.some(bid => {
            return bid.auctionId === auction.id
          })
        })

        setMyAuctions(myAuctionsData)

        let data = dataAuctions.filter(auction => {
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

        setFilteredFavoriteAuctions(data);           

      }
      
    }
    load()


  }, [])

  const favoritesPopdown = () => {
    if (showFavorites) {
      setShowFavorites(false)
    } else {
      setShowFavorites(true)
    }
  };
  const auctionsPopdown = () => {
    if (showAuctions) {
      setShowAuctions(false)
    } else {
      setShowAuctions(true)
    }
  };  
  const endedAuctionsPopdown = () => {
    if (showEndedAuctions) {
      setShowEndedAuctions(false)
    } else {
      setShowEndedAuctions(true)
    }
  };  


  const toggleFavorite = (articleObj) => {
    const existingFavorite = favorites.find(obj => obj.auction_id === articleObj.id);
    if (existingFavorite) {
      deleteFavorite(existingFavorite);
    }
  };

  const deleteFavorite = existingFavorite => {

    fetch(`/api/favorites/${existingFavorite.id}`, {
      method: "DELETE",
    })
      .then(response => response.json())
      .then(() => {
        const updatedFavorites = favorites.filter(obj => obj.auction_id !== existingFavorite.id);
        setFavorites(updatedFavorites);
      })
  }


  const ShowFavorites = () => {
    return <>
      {filteredFavoriteAuctions.map(favorite => (
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
            <div className="favorite-star">
            <FaStar color="yellow" style={{ fontSize: "45px" }} onClick={() => toggleFavorite(favorite)}/> 
          </div>
          <div className="favorite-go-to-page">
            <Link to={`/auction/${favorite.id}/${favorite.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <IoIosArrowForward style={{ fontSize: "45px" }} />
            </Link>
          </div>
        </article>
    ))}
    </>
  }

  const ShowAuctions = () => {
    return <>
      {
        myAuctions.map(auction => (
          <article className="favorite-article">
            <div className="favorite-picture">
              <Carousel objImages={auction.images} />
            </div>
            <div className="favorite-information">
              <h3>{auction.title}</h3>
              <p>Kategori: {auction.category}</p>
              <p>Värdering pris: {auction.valuationPrice}</p>
              <div>
                <p>Sluttid: </p>
                <Timer objEndTime={auction.endTime} fontSize={10} showBorder={false} setBold={true} />
              </div>
            </div>
            <div className="favorite-star">
              <h3>Mitt bud: </h3>
              <p>200</p>
            </div>
            <div className="favorite-go-to-page">
              <Link to={`/auction/${auction.id}/${auction.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <IoIosArrowForward style={{ fontSize: "45px" }} />
              </Link>
            </div>
          </article>
        ))
      }
    </>
  }

  const ShowEndedAuctions = () => {
    return <>
      <p>Hej hopp</p>
    </>
  }

  return <>

    <div className="my-page-main">
      <section>

      </section>
      <section className="section-information">
        <div className="favorite-section" onClick={favoritesPopdown}>
          <h3 className="favorite-drop-button" >Mina favoriter</h3>
          {showFavorites ? <IoMdArrowDropdown style={{ fontSize: "30px" }} /> : <IoMdArrowDropup style={{ fontSize: "30px" }} />}
        </div>
        {!showFavorites && <ShowFavorites />}

        <div className="auctions-section" onClick={auctionsPopdown}>
          <h3 className="auctions-drop-button" >Aktiva auktioner</h3>
          {showAuctions ? <IoMdArrowDropdown style={{ fontSize: "30px" }} /> : <IoMdArrowDropup style={{ fontSize: "30px" }} />}
        </div>
        {!showAuctions && <ShowAuctions />}
        
        <div className="ended-auctions-section" onClick={endedAuctionsPopdown}>
          <h3 className="ended-auctions-drop-button" >Avslutade auktioner</h3>
          {showEndedAuctions ? <IoMdArrowDropdown style={{ fontSize: "30px" }} /> : <IoMdArrowDropup style={{ fontSize: "30px" }} />}
        </div>
        {!showEndedAuctions && <ShowEndedAuctions />}        
        
      </section>
      
    </div>



  </>
}