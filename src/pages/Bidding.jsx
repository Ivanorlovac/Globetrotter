import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import { FaStar } from "react-icons/fa";


export default function Bidding() {

  const [auction, setAuction] = useState({})
  const { id } = useParams()

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
    <p>Hej</p>
    <div className="bidding-main">
      <div className="bidding-1">
        <ImgCarousel />
      </div>
      <div className="bidding-2">
        <div>
          <h2>{auction.title}</h2>
        </div>
        <button on onClick={''}>
          <p>Add to favorite</p>
          <FaStar />
        </button>
      </div>
      <div className="bidding-3">
        <div className="bidding-description">
          <article>
            {auction.description}
          </article>
        </div>
        <div className="bidding-status">
          <form>
            <div>
              <p>Time left: </p>
              {}
            </div>
          </form>
        </div>
      </div>
      <div className="bidding-4">

      </div>      
    </div>
  </>
}