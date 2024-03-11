import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io";
import Timer from "../components/Timer.jsx";
import Carousel from "../components/Carousel.jsx";
import Favorites from "../components/Favorites.jsx";

import PlaceBid from "../components/PlaceBid.jsx";
import BidsClosed from "../components/BidsClosed.jsx";
import TotalBids from "../components/TotalBids.jsx";

export default function Bidding() {

  const [auction, setAuction] = useState({})
  const [auctionClosed, setAuctionClosed] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    async function load() {
      const response = await fetch("/api/auctions/" + id)
      
      const dataAuction = await response.json()
      setAuction(dataAuction)
    }
    load()
  }, [])

  useEffect(() => {

    if (!auction.endTime) return;
    
    let timeNow = new Date().toLocaleString('se-SE', { timeZone: 'cet' })
    let timeEnd = new Date(auction.endTime).toLocaleString('se-SE', { timeZone: 'cet' })
    const timeLeft = Date.parse(timeEnd) - Date.parse(timeNow)
    
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setAuctionClosed(true)
      }, timeLeft)

      return () => clearTimeout(timer)
    } else {
      setAuctionClosed(true)
    }

  },[auction])


  const goBack = () => {
    history.back()
  };
  
 
  const ValuationPrice = () => {
    
    const styleValutationPrice = {
      fontSize: 20,
      fontWeight: "bold",
      border: "1px solid rgb(177, 177, 177)",
      padding: "7px",
      borderRadius: "20px",
      width: "fit-content",
      display: "flex",
      gap: "4px",
      backgroundColor: "white"
    }

    return <>
      <div style={styleValutationPrice}>
        <p style={{ margin: "0px" }}>{auction.valuationPrice}</p>
        <p style={{ margin: "0px" }}>kr</p>
      </div>
    </>
  }

  return <>
    <div className="bidding-main">
      <div className="bidding-back">
        <button type="button" className="go-back" onClick={goBack}>
          <IoIosArrowRoundBack />
          <p>Tillbaka</p>
        </button>
      </div>
      <div className="bidding-content">
        <div className="bidding-image">
          <div className="carousel-size">
            <Carousel objImages={auction.images} width={512} height={400} />
          </div>
          <div className="bidding-about">
            <h4>Om auktionen</h4>
            <div className="bidding-about-information">
              <p>{auction.description}</p>
            </div>
            <h4>Kategori</h4>
            <div className="bidding-about-category">
              <p>{auction.category}</p>
            </div>            
          </div>
        </div>

        <div className="bidding-information">
          <div className="bidding-title">
            <h2>{auction.title}</h2>
            <div className="bidding-creator">
              <div className="creator-container">
                <img src={auction.creatorImage} />
              </div>
              <div className="creator-text">
                <p>Skapad av</p>
                <p>{auction.creator}</p>
              </div>
              <Favorites />
            </div>
          </div>
          <div className="bidding-first ">
              <div className="column-timer column-center column-header-text">
                  <p>Tid kvar</p>
                  <Timer objEndTime={auction.endTime} fontSize={20} showBorder={true} setBold={true} />
                </div>
                <div className="column-bids column-center column-header-text">
                  <p>Totalt antal bud</p>
                  <TotalBids fontSize={20} showBorder={true} setBold={true} />
                </div>
                <div className="column-price column-center column-header-text">
                  <p>Värdering pris</p>
                  <ValuationPrice />
                </div>
          </div>
          <div className="bidding-second">
            {!auctionClosed ? <PlaceBid /> : <BidsClosed/>}
          </div>
        </div>
      </div>
    </div>
  </>
}