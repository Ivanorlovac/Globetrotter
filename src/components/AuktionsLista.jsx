import React, { useEffect, useState } from 'react';
import Carousel from './Carousel.jsx';
import SearchBar from './Search'; // Antag att detta är sökfältets komponent
import { Link } from 'react-router-dom';
import Timer from './Timer.jsx';

function getData() {
  const [filteredAuctions, setFilteredAuctions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/auctions')
      .then(response => {
        if (!response.ok) {
          throw new Error('Något gick fel vid hämtning av auktioner');
        }
        return response.json();
      })
      .then(data => {

        data = data.filter(auction => {
          let timeNow = new Date().toLocaleString('se-SE', { timeZone: 'cet' })
          let timeEnd = new Date(auction.endTime).toLocaleString('se-SE', { timeZone: 'cet' })
          return timeNow < timeEnd
        })

        data = data.sort((a, b) => {
          return new Date(a.endTime) - new Date(b.endTime)
        })

        setFilteredAuctions(data);
      })
      .catch(error => console.error('Fel:', error));
  }, []);

  return filteredAuctions
}

const AuktionsLista = () => {

  const filteredAuctions = getData()

  return (
    <div className="container">
      {filteredAuctions.filter(auction => {
        let timeNow = new Date().toLocaleString('se-SE', { timeZone: 'cet' })
        let timeEnd = new Date(auction.endTime).toLocaleString('se-SE', { timeZone: 'cet' }) 
        return timeNow < timeEnd
      }).map(auction => (
        <div key={auction.id} className='auction_list_container'>
          <Link to={`/auction/${auction.id}/${auction.title}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className='carousel-container'>
            <Carousel objImages={auction.images}/>
          </div>
            <div className="auction-item mb-4">
              <h5>{auction.title}</h5>
              <p>{auction.description}</p>
              <p>Startbud: {auction.valuationPrice} SEK</p>
              <div className='d-flex align-items-center'>
                <p className='me-1 my-0'>Slutar: </p>
                <Timer objEndTime={auction.endTime} fontSize={15} showBorder={false} setBold={false} />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

const AuktionsLista_Homepage = () => {

  const filteredAuctions = getData()

  return (
    <div className="container_Homepage">
      {filteredAuctions.filter(auction => {
        let timeNow = new Date().toLocaleString('se-SE', { timeZone: 'cet' })
        let timeEnd = new Date(auction.endTime).toLocaleString('se-SE', { timeZone: 'cet' })
        return timeNow < timeEnd
      }).map(auction => (
        <div key={auction.id} className='auction_list_container_Homepage'>
          <Link to={`/auction/${auction.id}/${auction.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className='carousel-container_Homepage'>
            <Carousel objImages={auction.images} />
          </div>
            <div className="auction-item mb-4">
              <h6>{auction.title}</h6>
              <p>Startbud: {auction.valuationPrice} SEK</p>
              <div className='d-flex align-items-center'>
                <p className='me-1 my-0'>Slutar: </p>
                <Timer objEndTime={auction.endTime} fontSize={12} showBorder={false} setBold={false} />
              </div>

            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export {AuktionsLista_Homepage, AuktionsLista};