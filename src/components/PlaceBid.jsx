import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
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
    fetch(`http://localhost:3000/bids?userId=${user.id}&auctionId=${id}`)
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
/*     setBidPlaced(false) */

    if (bidAmount <= 0) {
      return
    }

    if (bidAmount < higestBid ) {
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
        console.log('Bid successfully placed:', data);
        setBidPlaced(true)
        setUpdate(update+1)
      })
      .catch(error => console.error('Failed to place bid:', error));
  };



  const NoUser = () => {
    return <>
      <p>Logga in för att lägga och se dina bud.</p>
    </>
  }


  return <div className='bid-section'>
    {Object.keys(user).length === 0 ? <NoUser /> : <>
      <div>
        <form onSubmit={handleBidSubmit}>
          <input type="submit" value="Lägg bud" />
          <input type="number" placeholder='Ange summa' value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
        </form>
        {showAlert && (checkBid ? <ShowAlert type={'danger'} /> : bidPlaced ? <ShowAlert type={'success'} /> : <></>)}
      </div>

      <div className='show-bid'>
        {higestBid > 0 ? <p>Ditt högst lagda bud: {higestBid} kr</p> : <p>Lägg ett bud för att gå med i auktion</p>}
      </div>        
    </>}
  </div>

}