import React, { useEffect, useState, useContext } from 'react';
import { Globalcontext } from './GlobalContext.jsx';
import { useNavigate } from 'react-router-dom';

const SellersPage = () => {
  const { user } = useContext(Globalcontext);
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);

  
  useEffect(() => {
    
    if (user && user.role === 'seller') {
      fetchAuctions();
    } else {
      
      navigate('/');
    }
  }, [user, navigate]);

  const fetchAuctions = async () => {
    try {
      const response = await fetch(`http://localhost:3000/auctions?creator=${user.username}`);
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
            <li key={auction.id}>{auction.title}</li>
          ))}
        </ul>
      ) : (
        <p>Inga auktioner hittades.</p>
      )}
    </div>
  );
};

export default SellersPage;
