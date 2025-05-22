import React from "react";

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
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
