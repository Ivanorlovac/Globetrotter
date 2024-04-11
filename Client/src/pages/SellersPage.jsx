import React, { useEffect, useState, useContext } from 'react';
import { Globalcontext } from '../components/GlobalContext.jsx';
import { useNavigate } from 'react-router-dom';

const SellersPage = () => {
  const { user } = useContext(Globalcontext);
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);
  const [editingAuction, setEditingAuction] = useState(null);

  const handleDeleteAuktion = async (auktionId) => {
    
    const isConfirmed = window.confirm('Är du säker på att du vill radera auktionen?');

    
    if (isConfirmed) {
      try {
        const response = await fetch(`/api/auctions/${auktionId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Nätverksfel vid radering av auktion');
        alert('Auktion raderad');
        fetchAuctions()
      } catch (error) {
        console.error('Fel:', error);
      }
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
      const response = await fetch(`/api/auctions?creator=${encodeURIComponent(user.creator)}`);
      if (!response.ok) throw new Error('Nätverksfel vid hämtning av auktioner');
      const data = await response.json();
      setAuctions(data);
    } catch (error) {
      console.error('Fel:', error);
    }
  };

  const handleEdit = (auktion) => {
    setEditingAuction({ ...auktion });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingAuction(prevAuction => ({
      ...prevAuction,
      [name]: value
    }));
  };

  const handleUpdateAuction = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`/api/auctions/${editingAuction.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingAuction),
      });
      if (!response.ok) {
        throw new Error('Misslyckades att uppdatera auktion');
      }
      alert('Auktion uppdaterad');
      setEditingAuction(null); 
      fetchAuctions(); 
    } catch (error) {
      console.error('Error med uppdatering av auktion:', error);
    }
  };

  return (
    <div>
      <h2>Mina Auktioner</h2>
      {auctions.length > 0 ? (
        <ul>
          {auctions.map((auction) => (
            <div id='sellers_page' key={auction.id}>
              <h2>{auction.title}</h2>
              <p>{auction.description}</p>
              <p>Startbud: {auction.valuationPrice} SEK</p>
              <p>Slutar: {new Date(auction.endTime).toLocaleString()}</p>
              {user.role === 'seller' && (
                <>
                  <button className='button_smooth' onClick={() => handleDeleteAuktion(auction.id)}>Radera auktion</button>
                  <button className='button_smooth' onClick={() => handleEdit(auction)}>Ändra</button>
                </>
              )}
            </div>
          ))}
        </ul>
      ) : (
        <p>Inga auktioner hittades.</p>
      )}
      {editingAuction && (
        <form onSubmit={handleUpdateAuction}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={editingAuction.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="description">Beskrivning:</label>
            <textarea
              id="description"
              name="description"
              value={editingAuction.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="valuationPrice">Värdering:</label>
            <input
              type="number"
              id="valuationPrice"
              name="valuationPrice"
              value={editingAuction.valuationPrice}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="endTime">Sluttid:</label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={editingAuction.endTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="priceRange">Lägst godkända pris:</label>
            <input
              type="number"
              id="priceRange"
              name="priceRange"
              value={editingAuction.priceRange}
              onChange={handleChange}
            />
          </div>
        
          <button type="submit">Spara ändringar</button>
          <button onClick={() => setEditingAuction(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default SellersPage;
