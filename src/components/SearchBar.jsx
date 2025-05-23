import React, { useState, useEffect } from "react";

function SearchBar({ searchTerm, setSearchTerm }) {
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 500);
    return () => clearTimeout(timer);
  }, [inputValue, setSearchTerm]);

  return (
    <input
      type="text"
      placeholder="Ara"
      value={inputValue}
      className="search"
      onChange={handleChange}
    />
  );
}

export default SearchBar;
