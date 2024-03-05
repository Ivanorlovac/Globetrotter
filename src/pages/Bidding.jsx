import { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { IoIosArrowRoundBack } from "react-icons/io";
import Timer from "../components/Timer.jsx";
import Carousel from "../components/Carousel.jsx";
import Favorites from "../components/Favorites.jsx";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PlaceBid from "../components/PlaceBid.jsx";
import BidsClosed from "../components/BidsClosed.jsx";

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
  
  let timeNow = new Date().toLocaleString('se-SE', { timeZone: 'cet' })
  let timeEnd = new Date(auction.endTime).toLocaleString('se-SE', { timeZone: 'cet' })


  if (timeNow > timeEnd) {
    console.log("Tiden har gått ut")
  } else {
    console.log("Auktionen är igång fortfarande")
  }


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
          <Carousel objImages={auction.images} width={512} height={400}/>
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
              <div className="creator-text">
                <p>Created by</p>
                <p>{auction.creator}</p>
              </div>
            </div>
          </div>
          <div className="bidding-countdown">
            <Container>
              <Row>
                <Col>
                  <Timer objEndTime={auction.endTime} fontSize={15} showBorder={true} setBold={true} />
                </Col>
                <Col>
                  {/* <Favorites obj={auction} /> */}
                </Col>
              </Row>
            </Container>            
              
          </div>
          <div className="place-bid">
            {timeNow < timeEnd ? <PlaceBid /> : <BidsClosed/>}
          </div>
        </div>
      </div>
    </div>
  </>
}