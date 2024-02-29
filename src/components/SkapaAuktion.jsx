import React, { useState } from 'react';

const SkapaAuktion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startBid, setStartBid] = useState('');
  const [imageUrl, setImageUrl] = useState(''); 

  const handleSubmit = (e) => {
    e.preventDefault();

    // Definiera datan som ska skickas
    const auctionData = {
      title,
      description,
      startBid,
      currentBid: startBid,
      image: imageUrl, // Antag att detta är URL:en till bilden som sparas
    };

    // Använd fetch för att skicka POST-begäran
    fetch('http://localhost:3000/auctions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(auctionData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Nätverksrespons var inte ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Auktion skapad med bild-URL:', data);
        // Hantera framgångsrikt skapad auktion här, t.ex. rensa formuläret eller visa en bekräftelse
      })
      .catch(error => {
        console.error('Fel vid skapande av auktion:', error);
      });
  };

  const uploadImage = (e) => {
    const file = e.target.files[0]; // Hämta filen från input
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file); 
    formData.append('upload_preset', 'your_preset_here');

    // Använd fetch för att skicka filen till din bilduppladdningstjänst
    fetch(''
      , {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.secure_url) {
          // Antag att data.secure_url är URL:en till den uppladdade bilden
          setImageUrl(data.secure_url); // Spara URL i din komponents state
        }
      })
      .catch((error) => console.error('Error:', error));
  };


  return (
    <div className="container mt-4">
      <h2 className="mb-4">Skapa Ny Auktion</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Titel</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Beskrivning</label>
          <textarea
            className="form-control"
            id="description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Bild</label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={uploadImage}
          />
        </div>


        <div className="mb-3">
          <label htmlFor="startBid" className="form-label">Startbud</label>
          <input
            type="number"
            className="form-control"
            id="startBid"
            value={startBid}
            onChange={(e) => setStartBid(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Skapa Auktion</button>
      </form>
    </div>
  );
};

export default SkapaAuktion;
