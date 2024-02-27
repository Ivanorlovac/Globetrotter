import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Sök efter titel, beskrivning eller pris..."
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchBar;

