import React, { useEffect, useState } from 'react';
import Carousel from './Carousel.jsx';

import SearchBar from './Search'; // Antag att detta är sökfältets komponent
import { Link } from 'react-router-dom';
import Timer from './Timer.jsx';

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
      <SearchBar  />
      {filteredAuctions.map(auction => (
        <div key={auction.id}>
          <Carousel objImages={auction.images} width={600} height={400} />
          <Link to={`/auction/${auction.id}/${auction.title}`} key={auction.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="auction-item mb-4">

              <h5>{auction.title}</h5>
              <p>{auction.description}</p>
              <p>Startbud: {auction.startBid} SEK</p>
              {auction.currentBid && <p>Nuvarande bud: {auction.currentBid} SEK</p>}
              <p>Slutar: </p>
              <Timer objEndTime={auction.endTime} fontSize={15} showBorder={false} setBold={false} />
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AuktionsLista;
