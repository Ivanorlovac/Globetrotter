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

  const getParams = new URLSearchParams(document.location.search);

  const paramsData = [getParams.get("search")];

  let filteredAuctions = getData()

  if (paramsData[0] !== null) {
    let params = paramsData[0].split(' ')

    filteredAuctions = filteredAuctions.filter(auction =>
      params.some(term =>
        auction.title.toLowerCase().includes(term) ||
        auction.description.toLowerCase().includes(term) ||
        (auction.valuationPrice?.toString() || '').includes(term))
    );
  }


  return (
    <div className="container">
      {filteredAuctions.length !== 0 ?
        filteredAuctions.filter(auction => {
          let timeNow = new Date().toLocaleString('se-SE', { timeZone: 'cet' })
          let timeEnd = new Date(auction.endTime).toLocaleString('se-SE', { timeZone: 'cet' })
          return timeNow < timeEnd
        }).map(auction => (
          <div key={auction.id} className='auction_list_container'>
            <div className='carousel-container'>
              <Carousel objImages={auction.images} />
            </div>
            <Link to={`/auction/${auction.id}/${auction.title}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="auction-item mb-4">
                <h5>{auction.title}</h5>
                <p>{auction.description}</p>
                <p>Värderingspris: {auction.valuationPrice} SEK</p>
                <div className='d-flex align-items-center'>
                  <p className='me-1 my-0'>Slutar: </p>
                  <Timer objEndTime={auction.endTime} fontSize={15} showBorder={false} setBold={false} background={false} />
                </div>
              </div>
            </Link>
          </div>
        ))
        : <p>Finns inget resultat</p>}

    </div>
  );
};

const AuktionsLista_Homepage = () => {

  let filteredAuctions = getData()

  filteredAuctions = filteredAuctions.filter(auction => {
    let timeNow = new Date().toLocaleString('se-SE', { timeZone: 'cet' })
    let timeEnd = new Date(auction.endTime).toLocaleString('se-SE', { timeZone: 'cet' })
    return timeNow < timeEnd
  }).splice(0, 10)
  
  return (
    <div className="container_Homepage">
      {filteredAuctions.map(auction => (
        <div key={auction.id} className='auction_list_container_Homepage'>
          <div className='carousel-container_Homepage'>
            <Carousel objImages={auction.images} />
          </div>
          <Link to={`/auction/${auction.id}/${auction.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="auction-item mb-4">
              <h6>{auction.title}</h6>
              <p>Värderingspris: {auction.valuationPrice} SEK</p>
              <div className='d-flex align-items-center'>
                <p className='me-1 my-0'>Slutar: </p>
                <Timer objEndTime={auction.endTime} fontSize={12} showBorder={false} setBold={false} background={true} />
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export { AuktionsLista_Homepage, AuktionsLista };