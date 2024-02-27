import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const AuktionsDetaljer = () => {
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const { id } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3001/auctions/${id}`)
      .then(response => {
        setAuction(response.data);
      });
  }, [id]);

  const handleBidSubmit = (e) => {
    e.preventDefault();
    const newBid = {
      auctionId: id,
      amount: bidAmount,
      
    };

    axios.post('http://localhost:3001/bids', newBid)
      .then(response => {
        console.log('Bid successfully placed:', response.data);
        
      })
      .catch(error => console.error('Failed to place bid:', error));
  };

  if (!auction) return <div>Laddar auktionsdetaljer...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">{auction.title}</h2>
      {/* Auktionsdetaljer här */}
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
