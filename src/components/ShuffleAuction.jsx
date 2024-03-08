import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"

export default function ShuffleAuction() {
  
  const [auctions, setAuctions] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    
    async function getAuctions() {
      const response = await fetch('/api/auctions')
      const data = await response.json()
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