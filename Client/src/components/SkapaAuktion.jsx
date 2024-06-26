import React, { useState, useContext } from 'react';
import { Globalcontext } from '../components/GlobalContext.jsx';

const SkapaAuktion = () => {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [valuationPrice, setValuationPrice] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [category, setCategory] = useState('all inclusive');
  const [endTime, setEndTime] = useState('');
  const [images, setImages] = useState([]);
  const { user } = useContext(Globalcontext);

  const handleAddImage = (imageUrl) => {
    setImages([...images, imageUrl]);
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imagesString = images + ""
    
    const auctionData = {
      title,
      slug,
      description,
      valuationPrice: parseInt(valuationPrice),
      priceRange: parseInt(priceRange),
      imagesString,
      category,
      endTime,
      creator:user.creator,
      creatorImage:user.creatorImage,
    };

    console.log("Auction data: ", auctionData)

    try {
      const response = await fetch('/api/auctions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(auctionData)
      });
      if (!response) throw new Error('Nätverksrespons var inte ok');
      alert('Auktion skapad!');
    } catch (error) {
      console.error('Fel vid skapande av auktion:', error);
    }
  };


  return (
    <div className="container mt-4">
      <h2>Skapa Ny Auktion</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Titel</label>
          <input type="text" className="form-control" id="title" value={title} onChange={e => {
            setTitle(e.target.value)
            let slugText = e.target.value.replace(/ /g, "-")
            setSlug(slugText.toLowerCase())
          }} />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Beskrivning</label>
          <textarea className="form-control" id="description" rows="3" value={description} onChange={e => setDescription(e.target.value)}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="valuationPrice" className="form-label">Valuation price</label>
          <input type="number" className="form-control" id="valuationPrice" value={valuationPrice} onChange={e => setValuationPrice(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="priceRange" className="form-label">Price range</label>
          <input type="number" className="form-control" id="priceRange" value={priceRange} onChange={e => setPriceRange(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="imageInput" className="form-label">Image-URL</label>
          <input type="text" className="form-control" id="imageInput" onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddImage(e.target.value);
              e.target.value = '';
            }
          }}
            placeholder="Lägg till bild-URL och tryck Enter"
          />
        </div>
        {images.map((image, index) => (
          <div key={index} className="mb-2">
            {image} <button onClick={() => handleRemoveImage(index)}>Ta bort</button>
          </div>
        ))}


        <div className="mb-3">
          <label htmlFor='endTime' className='form-label'>End time</label>
          <input type='datetime-local' className='form-control' id='endTime' value={endTime} onChange={e => setEndTime(e.target.value)} />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category</label>
          <select className="form-select" id="category" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="all inclusive">All Inclusive</option>
            <option value="city">City</option>
            <option value="adventure">Adventure</option>
            <option value="spa">Spa</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Skapa Auktion</button>
      </form>
    </div>
  );
};

export default SkapaAuktion;
