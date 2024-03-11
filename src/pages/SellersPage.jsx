import React, { useEffect, useState, useContext } from 'react';
import { Globalcontext } from '../components/GlobalContext.jsx';
import { useNavigate } from 'react-router-dom';

const SellersPage = () => {
  const { user } = useContext(Globalcontext);
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);

  const handleDeleteAuktion = async (auktionId) => {
    try {
      const response = await fetch(`http://localhost:3000/auctions/${auktionId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Nätverksfel vid radering av auktion');
      alert('Auktion raderad');
    } catch (error) {
      console.error('Fel:', error);
    }
  };
  
  useEffect(() => {
    
    if (user && user.role === 'seller') {
      fetchAuctions();
    } else {
      
      navigate('/');
    }
  }, [user, navigate]);

  const fetchAuctions = async () => {
    try {
      const response = await fetch(`http://localhost:3000/auctions?creator=${encodeURIComponent(user.creator)}`);
      if (!response.ok) throw new Error('Nätverksfel vid hämtning av auktioner');
      const data = await response.json();
      setAuctions(data);
    } catch (error) {
      console.error('Fel:', error);
    }
  };

  return (
    <div>
      <h1>Mina Auktioner</h1>
      {auctions.length > 0 ? (
        <ul>
          {auctions.map((auction) => (
            <div key={auction.id} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
              <h2>{auction.title}</h2>
              <p>{auction.description}</p>
              <p>Startbud: {auction.valuationPrice} SEK</p>
              <p>Slutar: {new Date(auction.endTime).toLocaleString()}</p>
              {user.role === 'seller' && (
                <button onClick={() => handleDeleteAuktion(auction.id)}>Radera auktion</button>
              )}
              
            </div>
          ))}
        </ul>
      ) : (
        <p>Inga auktioner hittades.</p>
      )}
    </div>
  );
};

export default SellersPage;
