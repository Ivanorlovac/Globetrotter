import { useState, useEffect, useContext } from "react"
import { useParams } from "react-router-dom"
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import { IoIosArrowRoundBack } from "react-icons/io";
import Timer from "../components/Timer.jsx";
import { Globalcontext } from "../components/GlobalContext.jsx";
import Carousel from "../components/Carousel.jsx";

export default function Bidding() {

  const [auction, setAuction] = useState({})
  const { id } = useParams()
  const { timeCloseAution } = useContext(Globalcontext)

  useEffect(() => {
    async function load() {
      console.log("ID:", id)
      const response = await fetch("/api/auctions/" + id)
      const data = await response.json()
      setAuction(data)
    }
    load()
  }, [])

  const ImgCarousel = () => <>
    <div className="img-carousel" >
      <MDBCarousel showControls>
        <MDBCarouselItem itemId={1}>
          <img src='https://mdbootstrap.com/img/new/slides/041.jpg' className='d-block w-100' alt='...' />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={2}>
          <img src='https://mdbootstrap.com/img/new/slides/042.jpg' className='d-block w-100' alt='...' />
        </MDBCarouselItem>
        <MDBCarouselItem itemId={3}>
          <img src='https://mdbootstrap.com/img/new/slides/043.jpg' className='d-block w-100' alt='...' />
        </MDBCarouselItem>
      </MDBCarousel>
    </div>
  </>

  
  return <>
    <div className="bidding-main">
      <div className="bidding-back">
        <button type="button" className="go-back">
          <IoIosArrowRoundBack />
          <p>Go back</p>
        </button>
      </div>
      <div className="bidding-content">
        <div className="bidding-image">
          <div className="image-container">
            {/* <img src={auction.images} /> */}
            <Carousel objImages={auction.images} />
          </div>
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