import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShowAlert from './ShowAlert.jsx';


export default function PlaceBid() {
  
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [myBids, setMyBids] = useState([])
  const [update, setUpdate] = useState(1)
  const [higestBid, setHigestBid] = useState(0)
  const [checkBid, setCheckBid] = useState(false)
  const [bidPlaced, setBidPlaced] = useState(false)
  const { id } = useParams();

  const user_id = 1

  useEffect(() => {
    fetch(`http://localhost:3000/bids?userId=${user_id}`)
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
    fetch(`http://localhost:3000/auctions/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Nätverksfel vid hämtning av auktionsdetaljer');
        }
        return response.json();
      })
      .then(data => setAuction(data))
      .catch(error => console.error('Fel:', error));
  }, [id]);

  const handleBidSubmit = (e) => {

    e.preventDefault();
    setBidPlaced(false)

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
      userId: user_id,
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

  if (!auction) return <div>Laddar auktionsdetaljer...</div>;

  const Highestbid = () => {
    const max = Math.max(...myBids.map(item => item.amount))
    setHigestBid(max)
    return <p>{max} kr</p>
  }
  


  return <div className='bid-section'>
    <div>
      <form onSubmit={handleBidSubmit}>
        <input type="submit" value="Lägg bud" />
        <input type="number" placeholder='Ange summa' value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
      </form>
      {checkBid ? <ShowAlert type={'danger'} /> : bidPlaced ? <ShowAlert type={'success'} /> : <></>}
    </div>

    <div className='higest-bid'>
      <p>Högsta lagda bud: </p>
      <Highestbid/>
    </div>
  </div>

}