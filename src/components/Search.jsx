import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    
  };
  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

 

  return (
    <div> 
      <form onSubmit={handleSearch}>
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

