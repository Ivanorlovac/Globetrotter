import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import ShowAlert from './ShowAlert.jsx';
import { Globalcontext } from './GlobalContext.jsx';


export default function PlaceBid() {
  
  const {user} = useContext(Globalcontext)
  const [bidAmount, setBidAmount] = useState('');
  const [myBids, setMyBids] = useState([])
  const [update, setUpdate] = useState(1)
  const [higestBid, setHigestBid] = useState(0)
  const [checkBid, setCheckBid] = useState(false)
  const [bidPlaced, setBidPlaced] = useState(false)
  const [showAlert, setShowAlert] = useState(false);
  const { id } = useParams();
  
  useEffect(() => {
    fetch(`http://localhost:3000/bids/auction${id}/user/${user.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Nätverksfel vid hämtning av auktionsdetaljer');
        }
        return response.json();
      })
      .then(data => setMyBids(data))
      .catch(error => console.error('Fel:', error));  
    
  }, [update])

  useEffect(() => {
    const max = Math.max(...myBids.map(item => item.amount))
    setHigestBid(max)    
  },[myBids])

  useEffect(() => {
    setShowAlert(true);

    const timer = setTimeout(() => {
      setCheckBid(false)
      setBidPlaced(false)
      setShowAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [checkBid, bidPlaced]);


  const handleBidSubmit = (e) => {

    e.preventDefault();

    if (bidAmount <= 0) {
      return
    }

    if (bidAmount <= higestBid ) {
      setCheckBid(true)
      return
    }

    const newBid = {
      auctionId: id,
      amount: bidAmount,
      userId: user.id,
      time: new Date().toLocaleString('se-SE', { timeZone: 'cet' })
    };

    fetch('http://localhost:3000/bids', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBid),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Nätverksfel vid läggande av bud');
        }
        return response.json();
      })
      .then(data => {
        setBidPlaced(true)
        setUpdate(update+1)
      })
      .catch(error => console.error('Failed to place bid:', error));
  };



  const NoUser = () => {
    return <>
      {user.role === 'seller' ? <p style={{ fontWeight: "bold", margin: "0px", fontSize: "120%" }}>Logga in som en användare för att kunna lägga bud</p>
        : <p style={{ fontWeight: "bold", margin: "0px", fontSize: "120%" }}><Link to="/login" style={{ textDecoration: "none", color: "gray" }}>Logga in för att lägga och se dina bud</Link></p>}
    </>
  }


  return <>
    {user.role !== 'user' ? <NoUser /> : <>
      <div className='show-bid'>
        {higestBid > 0 ? <p style={{color:"black", fontWeight: "400", fontSize: "90%"}}>Ditt högst lagda bud: <span style={{color: "black", fontSize: "160%", fontWeight: "bold"}}>{higestBid} kr</span></p> : <p>Lägg ett bud för att gå med i auktion</p>}
      </div>          
        <form onSubmit={handleBidSubmit}>
        <input type="number" placeholder='Ange summa' value={bidAmount} className="input-place-bid" onChange={(e) => setBidAmount(e.target.value)} />
        <input type="submit" value="Lägg bud" className='button-place-bid' />
        </form>
        {showAlert && (checkBid ? <ShowAlert type={'danger'} /> : bidPlaced ? <ShowAlert type={'success'} /> : <></>)}
    </>}
  </>

}