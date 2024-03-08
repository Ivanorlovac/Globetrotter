import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()

  const settingsParam = {
    search: searchTerm
  }

  const params = new URLSearchParams(settingsParam);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    
  };
  const handleSearch = (event) => {
    event.preventDefault();

    navigate(`/alla-auktioner/?${params}`)
  }; 

  return (
    <div> 
      <form className='d-flex align-items-start gap-1' onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Sök efter titel, beskrivning eller pris..."
          value={searchTerm}
          onChange={handleChange}
        />
        <input id='search_button' type='submit' value='Sök' />
      </form>
    </div>
  );
};

export default SearchBar;

