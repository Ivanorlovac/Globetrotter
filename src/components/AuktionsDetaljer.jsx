import React, { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';


const AuktionsDetaljer = () => {
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
      })
      .catch(error => console.error('Failed to place bid:', error));
  };

  if (!auction) return <div>Laddar auktionsdetaljer...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{auction.title}</h2>
      <form onSubmit={handleBidSubmit}>
        <div className="mb-3">
          <label htmlFor="bidAmount" className="form-label">Ditt bud</label>
          <input
            type="number"
            className="form-control"
            id="bidAmount"
            value={bidAmount}
            onChange={(e) => setBidAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Lägg Bud</button>
      </form>
    </div>
  );
};

export default AuktionsDetaljer;