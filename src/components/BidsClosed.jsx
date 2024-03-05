import { Globalcontext } from "./GlobalContext.jsx"
import { useContext } from "react"



export default function BidsClosed() {
  
  const {user} = useContext(Globalcontext)
  
  
  return <>
    <div className="auction-ended-container">
      <h3>Auktionen är avslutad:</h3>
    </div>
  
  </>
}