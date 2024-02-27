
import React, { useState } from 'react';
import axios from 'axios';


const SkapaAuktion = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startBid, setStartBid] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/auctions', {
      title,
      description,
      startBid,
      currentBid: startBid,
      image: imageUrl,
    }).then(() => {
      console.log('Auktion skapad med bild-URL');
    }).catch(error => {
      console.error('Fel vid skapande av auktion:', error);
    });
  };

  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    
    const formData = new FormData();
    formData.append('file', file);
    
    axios.post('https://dinbilduppladdningstjanst.com/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(response => {
      
      setImageUrl(response.data.url);
    }).catch(error => console.error('Uppladdning misslyckades:', error));
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
