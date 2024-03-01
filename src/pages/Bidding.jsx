import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import { IoIosArrowRoundBack } from "react-icons/io";
import Timer from "../components/Timer.jsx";
import { Globalcontext } from "../components/GlobalContext.jsx";
import Carousel from "../components/Carousel.jsx";

export default function Bidding() {

  const [auction, setAuction] = useState({})
  const [category, setCategory] = useState({})
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


  const goToHomepage = () => {
    navigate("/");
  };
  
  return <>
    <div className="bidding-main">
      <div className="bidding-back">
        <button type="button" className="go-back" onClick={goToHomepage}>
          <IoIosArrowRoundBack />
          <p>Go back</p>
        </button>
      </div>
      <div className="bidding-content">
        <div className="bidding-image">
          <Carousel objImages={auction.images} />
          <div className="bidding-about">
            <h4>About Auction</h4>
            <div className="bidding-about-information">
              <p>{auction.description}</p>
            </div>
          </div>
        </div>

        <div className="bidding-information">
          <div className="bidding-title">
            <h2>{auction.title}</h2>
            <p>Categoty: clocks</p>
            <div className="bidding-creator">
              <div className="creator-container">
                <img src={auction.creatorImage} />
              </div>
              <p>{auction.creator}</p>
            </div>
          </div>
            <div className="bidding-countdown">
              <Timer objEndTime={auction.endTime} fontSize={15} showBorder={true} setBold={true} />
            </div>
        </div>
      </div>

    </div>
  </>
}