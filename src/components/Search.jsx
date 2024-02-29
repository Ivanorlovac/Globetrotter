import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    ;
  };

  function handleSearch(event) {
    onSearch(event.target.value)
    event.preventDefault()

  }

  return (
    <search>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Sök efter titel, beskrivning eller pris..."
          value={searchTerm}
          onChange={handleChange}
        />
        <input type='submit' value='Sök'></input>
      </form>
    </search>

  );
};

export default SearchBar;

