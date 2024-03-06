import React, { useEffect, useState } from 'react';

const BackgroundSyncClosedAuctions = () => {



  useEffect(() => {
    
    const syncDataInBackground = async () => {
      try {

        let dataAuctions = await getAuctions()
        let newClosedAutions = await checkForClosedAuctions(dataAuctions)
        if (newClosedAutions.length > 0) {
          await moveClosedAuctions(newClosedAutions)          
        }




      } catch (error) {
        console.error('Background sync error:', error);
      }
    };

    const backgroundSyncInterval = setInterval(() => {
      syncDataInBackground();
    }, 10000); // Execute every 15 minutes

    return () => {
      clearInterval(backgroundSyncInterval);
    };
  }, []);

  async function getAuctions() {
    const response = await fetch('/api/auctions')
    const data = await response.json()
    return data
  }
  
  async function getClosedAuctions() {
    const response = await fetch('/api/closed_auctions')
    const data = await response.json()
    return data
  }
  
  async function getWinnersAuctions() {
    const response = await fetch('/api/result_closed_auctions')
    const data = await response.json()
    return data
  }  

  async function checkForClosedAuctions(data) {
    if (data.length === 0) {
      console.log("Auction list is empty")
      return
    }
    
    let closedAuctions = data.filter(auction => {
      let timeNow = new Date().toLocaleString('se-SE', { timeZone: 'cet' })
      let timeEnd = new Date(auction.endTime).toLocaleString('se-SE', { timeZone: 'cet' })
      return timeNow > timeEnd
    }).map(auction => {
      return auction
    })

    return closedAuctions
  }

  async function moveClosedAuctions(auctions){

    const operations = auctions.map(async auction => {
      await addAuction(auction)
      await getAuctionWinner(auction)
      await deleteAuction(auction).then((data) => {
        console.log("Auction Deleted: ", data)
      })
    })

    await Promise.all(operations)

    async function addAuction(auction){
      try {
        const response = await fetch("http://localhost:3000/closed_auctions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(auction),
        });

        const result = await response.json();
        console.log("Success ADD:", result);
      } catch (error) {
        console.error("Error:", error);
      }      
    }

    async function deleteAuction(auction) {
      const response = await fetch(`http://localhost:3000/auctions/${auction.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.json();
    }

    async function getAuctionWinner(auction) {

      const priceRange = auction.priceRange
      const valuationPrice = auction.valuationPrice

      const bids = await getAuctionBids(auction.id)
      if (bids.length > 0) {

        const approvedBids = bids.filter(bid => {
          return Number(bid.amount) >= (valuationPrice - priceRange) && Number(bid.amount) <= (valuationPrice + priceRange)
        }).map(bid => {
          return bid
        })

        console.log("Approved bids: ", approvedBids)

        /* const higest  = Math.max(...myBids.map(item => item.amount)) */
      } else {
        console.log("Ingen har lagt något bud på auktionen")
        return
      }
    }



    async function getAuctionBids(id) {
      const response = await fetch(`/api/bids?auctionId=${id}`)
      const data = await response.json()
      return data
    }
  }



  return <></>;
};

export default BackgroundSyncClosedAuctions;