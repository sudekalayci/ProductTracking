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

  return (
    <div className="App">
      <h1>Makeup Tracker</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="main-content">
        <div className="left-sidebar">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
        <div className="product-area">
          <ProductGrid
            products={filteredProducts}
            onDelete={deleteProduct}
            onEdit={handleEditProduct}
          />
          <button className="add-btn" onClick={() => setShowForm(true)}>+</button>
        </div>
        <div className="right-sidebar">
          <h3>Sıralama</h3>
          <ul>
            <li onClick={() => setSortType("expired")} className={sortType === "expired" ? "active" : ""}>Süresi Geçenler</li>
            <li onClick={() => setSortType("soon")} className={sortType === "soon" ? "active" : ""}>Yakınlaşanlar</li>
            <li onClick={() => setSortType("long")} className={sortType === "long" ? "active" : ""}>Zamanı Olanlar</li>
          </ul>
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
