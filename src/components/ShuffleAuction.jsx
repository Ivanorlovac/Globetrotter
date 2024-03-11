import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

export default function ShuffleAuction() {
  
  const [auctions, setAuctions] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    
    async function getAuctions() {
      const response = await fetch('/api/auctions')
      let data = await response.json()

      data = data.filter(auction => {
        let timeNow = new Date().toLocaleString('se-SE', { timeZone: 'cet' })
        let timeEnd = new Date(auction.endTime).toLocaleString('se-SE', { timeZone: 'cet' })
        return timeNow < timeEnd
      })
      
      setAuctions(data)
    }
    getAuctions()
  },[])

  const shuffle = () => {
    
    if (auctions.length > 0) {
      const randomIndex = Math.floor(Math.random() * auctions.length);
      const randomAuction = auctions[randomIndex];
      navigate(`/auction/${randomAuction.id}/${randomAuction.slug}`)
    }
  }


  /* <Link to={`/auction/${auction.id}/${auction.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}> */

  return <>
    <button id='shuffle_button' onClick={shuffle}><span className="material-symbols-outlined">shuffle</span><br />SLUMPA</button>

  </>
}