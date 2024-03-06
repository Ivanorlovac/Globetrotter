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
import TotalBids from "../components/TotalBids.jsx";

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

  const ValuationPrice = () => {
    
    const styleValutationPrice = {
      fontSize: 20,
      fontWeight: "bold",
      border: "2px solid rgb(177, 177, 177)",
      padding: "7px",
      borderRadius: "20px",
      width: "fit-content",
      display: "flex",
      gap: "4px",
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
        <button type="button" className="go-back" onClick={goToHomepage}>
          <IoIosArrowRoundBack />
          <p>Go back</p>
        </button>
      </div>
      <div className="bidding-content">
        <div className="bidding-image">
          <Carousel objImages={auction.images} width={512} height={400}/>
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
            </div>
          </div>
          <div className="bidding-countdown">
            <Container fluid style={{margin: "0px", padding: "0px"}}>
              <Row style={{margin: "0px"}}>
                <Col className="column-bidding">
                  <p>Tid kvar</p>
                  <Timer objEndTime={auction.endTime} fontSize={20} showBorder={true} setBold={true} />
                </Col>
                <Col className="align-items-center">
                  <p>Totalt antal bud</p>
                  <TotalBids fontSize={20} showBorder={true} setBold={true} />
                </Col>
                <Col className="column-bidding">
                  <p>Värdering pris</p>
                  <ValuationPrice />
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