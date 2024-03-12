import React, { useEffect, useState, useContext } from 'react';
import { Globalcontext } from '../components/GlobalContext.jsx';
import { useNavigate } from 'react-router-dom';

const SellersPage = () => {
  const { user } = useContext(Globalcontext);
  const navigate = useNavigate();
  const [auctions, setAuctions] = useState([]);
  const [editingAuction, setEditingAuction] = useState(null);

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
      const response = await fetch(`http://localhost:3000/auctions/${editingAuction.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingAuction),
      });
      if (!response.ok) {
        throw new Error('Failed to update auction');
      }
      alert('Auktion uppdaterad');
      setEditingAuction(null); 
      fetchAuctions(); 
    } catch (error) {
      console.error('Error updating auction:', error);
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
                <>
                  <button onClick={() => handleDeleteAuktion(auction.id)}>Radera auktion</button>
                  <button onClick={() => handleEdit(auction)}>Edit</button>
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
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={editingAuction.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="valuationPrice">Valuation Price:</label>
            <input
              type="number"
              id="valuationPrice"
              name="valuationPrice"
              value={editingAuction.valuationPrice}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="endTime">End Time:</label>
            <input
              type="datetime-local"
              id="endTime"
              name="endTime"
              value={editingAuction.endTime}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="priceRange">Price Range:</label>
            <input
              type="number"
              id="priceRange"
              name="priceRange"
              value={editingAuction.priceRange}
              onChange={handleChange}
            />
          </div>
        
          <button type="submit">Save Changes</button>
          <button onClick={() => setEditingAuction(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default SellersPage;
