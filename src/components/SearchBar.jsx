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
    }, 500); // 500ms delay before updating searchTerm

    return () => clearTimeout(timer); // Clean up on component unmount or inputValue change
  }, [inputValue, setSearchTerm]);

  return (
    <input
      type="text"
      placeholder="Ürün ara..."
      value={inputValue}
      className="search"
      onChange={handleChange}
    />
  );
}

export default SearchBar;