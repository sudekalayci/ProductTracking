import React, { useState, useEffect } from "react";
import "./styles/App.css";
import ProductGrid from "./components/ProductGrid";
import ProductForm from "./components/ProductForm";
import SearchBar from "./components/SearchBar";
import CategoryFilter from "./components/CategoryFilter";

function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("makeup-products");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    localStorage.setItem("makeup-products", JSON.stringify(products));
  }, [products]);

  const handleSaveProduct = (product) => {
    if (editProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
      setEditProduct(null);
    } else {
      setProducts((prev) => [...prev, product]);
    }
    setShowForm(false);
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleEditProduct = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const getDaysLeft = (date) => {
    const today = new Date();
    const exp = new Date(date);
    return Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
  };

  let filteredProducts = searchTerm
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === selectedCategory
    );
  }

  if (sortType === "expired") {
    filteredProducts = filteredProducts
      .slice()
      .sort((a, b) => getDaysLeft(a.expiryDate) - getDaysLeft(b.expiryDate));
  } else if (sortType === "soon") {
    filteredProducts = filteredProducts
      .slice()
      .sort((a, b) => getDaysLeft(a.expiryDate) - getDaysLeft(b.expiryDate))
      .filter((p) => getDaysLeft(p.expiryDate) <= 30 && getDaysLeft(p.expiryDate) > 0);
  } else if (sortType === "long") {
    filteredProducts = filteredProducts
      .slice()
      .sort((a, b) => getDaysLeft(b.expiryDate) - getDaysLeft(a.expiryDate));
  }

  const categories = [...new Set(products.map((p) => p.category))];
  const [showSortMenu, setShowSortMenu] = useState(false);

  return (
      <div className="App">
        <div className="main-content">
          <div className="left-sidebar">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
            <div className="sort-toggle">
      <button
        onClick={() => setShowSortMenu((prev) => !prev)}
        className="sort-button"
      >
        Sıralama
      </button>
      {showSortMenu && (
        <ul className="sort-menu">
          <li
            onClick={() => {
              setSortType("expired");
              setShowSortMenu(false);
            }}
            className={sortType === "expired" ? "active" : ""}
          >
            Süresi Geçenler
          </li>
          <li
            onClick={() => {
              setSortType("soon");
              setShowSortMenu(false);
            }}
            className={sortType === "soon" ? "active" : ""}
          >
            Yakınlaşanlar
          </li>
          <li
            onClick={() => {
              setSortType("long");
              setShowSortMenu(false);
            }}
            className={sortType === "long" ? "active" : ""}
          >
            Zamanı Olanlar
          </li>
        </ul>
      )}
      </div>
    </div>
    <div className="product-area">
      <div className="top-box">
        <h1>Ürün Takip</h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
      <ProductGrid
        products={filteredProducts}
        onDelete={deleteProduct}
        onEdit={handleEditProduct}
      />
      <button className="add-btn" onClick={() => setShowForm(true)}>+</button>
    </div>     
  </div>
  {showForm && (
    <ProductForm
      onAdd={handleSaveProduct}
      onCancel={() => {
        setShowForm(false);
        setEditProduct(null);
      }}
      initialData={editProduct}
    />
  )}
</div>
  );
}

export default App;
