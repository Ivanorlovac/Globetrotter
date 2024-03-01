import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PlaceBid() {
  
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const { id } = useParams();

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
    const newBid = {
      auctionId: id,
      amount: bidAmount,

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
        // Du kan här välja att uppdatera UI:t eller ge användaren feedback
      })
      .catch(error => console.error('Failed to place bid:', error));
  };

  if (!auction) return <div>Laddar auktionsdetaljer...</div>;

  console.log("Bid value: ", bidAmount)

  return <form onSubmit={handleBidSubmit}>
    <input type="submit" value="Lägg bud"/>
    <input type="number" value={bidAmount} onChange={(e) => setBidAmount(e.target.value)} />
  </form>
}