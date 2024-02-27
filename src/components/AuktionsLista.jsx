import React, { useEffect, useState } from 'react';

import SearchBar from './Search'; // Antag att detta är sökfältets komponent
import { Link } from 'react-router-dom';

const AuktionsLista = () => {
  const [auctions, setAuctions] = useState([]);
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  // Lägger till useEffect här för att hämta auktionsdata när komponenten laddas
  useEffect(() => {
    fetch('http://localhost:3000/auctions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Något gick fel vid hämtning av auktioner');
        }
        return response.json();
      })
      .then(data => {
        setAuctions(data);
        setFilteredAuctions(data); // Initialt är filtrerade auktioner samma som alla auktioner
      })
      .catch(error => console.error('Fel:', error));
  }, []);

  const handleSearch = (searchTerm) => {
    const term = searchTerm.toLowerCase();
    const filtered = auctions.filter(auction =>
      auction.title.toLowerCase().includes(term) ||
      auction.description.toLowerCase().includes(term) ||
      auction.startBid.toString().includes(searchTerm) ||
      (auction.currentBid && auction.currentBid.toString().includes(searchTerm))
    );
    setFilteredAuctions(filtered);
  };

  // Endast en return-sats ska användas här
  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />
      {filteredAuctions.map(auction => (
        <Link to={`/auktion/${auction.id}`} key={auction.id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="auction-item mb-4">
            <img src={auction.image} alt={auction.title} style={{ width: '100%', height: 'auto', maxWidth: '600px' }} className="mb-3" />
            <h5>{auction.title}</h5>
            <p>{auction.description}</p>
            <p>Startbud: {auction.startBid} SEK</p>
            {auction.currentBid && <p>Nuvarande bud: {auction.currentBid} SEK</p>}
            <p>Slutar: {new Date(auction.endTime).toLocaleString()}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AuktionsLista;
