import { useContext, useState, useEffect } from "react"
import { Globalcontext } from "../components/GlobalContext.jsx"
import Carousel from "../components/Carousel.jsx";
import Timer from "../components/Timer.jsx";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaRegStar, FaStar } from "react-icons/fa6";
import { IoIosArrowForward } from "react-icons/io";



export default function MyPage() {

  const [myAuctions, setMyAuctions] = useState([])
  const [myBids, setMybids] = useState([])
  const { favorites, setFavorites, user, updateUser } = useContext(Globalcontext)
  const [showFavorites, setShowFavorites] = useState(true);
  const [showAuctions, setShowAuctions] = useState(true);
  const [showEndedAuctions, setShowEndedAuctions] = useState(true);
  const [newUsername, setNewUsername] = useState(user.username);
  const [newPassword, setNewPassword] = useState(user.password);
  const [filteredFavoriteAuctions, setFilteredFavoriteAuctions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  const isConfirmed = window.confirm('Är du säker på att du vill uppdatera din profil?');
    if (isConfirmed) {
      updateUser({ ...user, username: newUsername, password: newPassword });
      alert('Profil uppdaterad!');
    } else {

      return;
    } 
  };


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
      setMybids(dataBids)
      const dataAuctions = await getAuctions()

      if (dataBids && dataAuctions) {

        let myAuctionsData = dataAuctions.filter(auction => {
          let timeNow = new Date().toLocaleString('se-SE', { timeZone: 'cet' })
          let timeEnd = new Date(auction.endTime).toLocaleString('se-SE', { timeZone: 'cet' })
          return timeNow < timeEnd
        })

        let myAuctionsDataFiltered = myAuctionsData.filter(auction => {
          return dataBids.some(bid => {
            return bid.auctionId === auction.id
          })
        })

        let data = myAuctionsData.sort((a, b) => {
          return new Date(a.endTime) - new Date(b.endTime)
        })

        data = data.filter(auction => {
          return favorites.some(favorite => {
            return favorite.auction_id === auction.id
          })
        })
        setMyAuctions(myAuctionsDataFiltered)
        setFilteredFavoriteAuctions(data);           

      }
      
    }
    load()


  }, [])

  console.log("Favorites: ", favorites)

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
              <p>Värderingspris: {favorite.valuationPrice}</p>
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

  const getBid = (id) => {

    console.log("Mybids: ", myBids)
    
    const listBidsForauction = myBids.filter(bid => {
      return bid.auctionId === id
    })
      
    console.log("listBidsForauction: ", listBidsForauction)

    const bid = Math.max(...listBidsForauction.map(item => item.amount))

    return bid
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
              <p>Värderingspris: {auction.valuationPrice}</p>
              <div>
                <p>Sluttid: </p>
                <Timer objEndTime={auction.endTime} fontSize={10} showBorder={false} setBold={true} />
              </div>
            </div>
            <div className="favorite-star">
              <h3>Mitt bud: </h3>
              <p>{getBid(auction.id)}</p>
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
      <section id="my_page_first_section">
        <h2>Välkommen {user.username} till Mina sidor!</h2>
        <h3>Konto:</h3>
        <form onSubmit={handleSubmit}>
          <label>
            Användarnamn: <br/>
            <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
          </label>
          <label>
            Nytt lösenord: <br/>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
          </label>
          <button id="my_page_update_button" className="button_smooth" type="submit">Uppdatera profil</button>
        </form>
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