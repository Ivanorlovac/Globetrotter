import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


export default function TotalBids(props) {
  
  const { id } = useParams()

  const [auctions, setAuctions] = useState([])

  useEffect(() => {

    const interval = setInterval(() => {
      load()
    },1000)

    async function load() {
      let api = ''

      if (id !== null) {
        api = `/api/bids?auctionId=${id}`
      } else {
        api = `/api/bids`
      }
      const response = await fetch(api)        
      const data = await response.json()
      setAuctions(data)
    }

    return () => clearInterval(interval)

  },[])

  const styleTotalBidsAmount = {
    fontSize: props.fontSize,
    fontWeight: props.setBold ? "bold" : "normal",
    border: props.showBorder ? "1px solid rgb(177, 177, 177)" : "none",
    padding: "7px",
    borderRadius: "20px",
    width: "fit-content",
    backgroundColor: "white",
  }

  return <>
      <div style={styleTotalBidsAmount}>
        <p style={{margin: "0px"}}>{auctions.length}</p>
      </div>
  </>

}