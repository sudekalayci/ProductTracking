import React, { useState, useEffect } from "react";

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return (
      <div className="category-filter">
        <h3>Kategoriler</h3>
        <select
          value={selectedCategory}
          onChange={(e) => onSelectCategory(e.target.value)}
          className="category-select"
        >
          <option value="">Tümü</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="category-filter">
      <h3>Kategoriler</h3>
      <ul>
        <li
          className={selectedCategory === "" ? "active" : ""}
          onClick={() => onSelectCategory("")}
        >
          Tümü
        </li>
        {categories.map((cat) => (
          <li
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => onSelectCategory(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryFilter;
