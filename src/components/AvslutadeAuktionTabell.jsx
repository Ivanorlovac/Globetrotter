import React from 'react';

const AvslutadeAuktionerTabell = ({ auctions }) => {

  return (
    <table>
      <thead>
        <tr>
          <th>Titel</th>
          <th>Beskrivning</th>
          <th>Startbud</th>
          <th>Högsta Bud</th>
          <th>Slutdatum</th>
        </tr>
      </thead>
      <tbody>
        {auctions.map((auction) => (
          <tr key={auction.id}>
            <td>{auction.title}</td>
            <td>{auction.description}</td>
            <td>{auction.startBid} SEK</td>
            <td>{auction.currentBid} SEK</td>
            <td>{new Date(auction.endTime).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AvslutadeAuktionerTabell;
