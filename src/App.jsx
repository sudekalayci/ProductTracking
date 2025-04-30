import React, { useState, useEffect } from "react";
import "./styles/App.css";
import ProductGrid from "./components/ProductGrid";
import ProductForm from "./components/ProductForm";
import SearchBar from "./components/SearchBar";

function App() {
  // localStorage'dan veriyi okuyoruz. Verileri sayfa her açıldığında alıyoruz.
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("makeup-products");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  // products değiştiğinde localStorage'a kaydediyoruz.
  useEffect(() => {
    if (products.length > 0) {
      console.log("Veri localStorage'a kaydediliyor:", products); // Konsol logu ekleyelim
      localStorage.setItem("makeup-products", JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
    setShowForm(false);
  };

  const deleteProduct = (productId) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== productId));
  };

  const filteredProducts = searchTerm
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <div className="App">
      <h1>Makyaj Ürünlerim</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProductGrid 
        products={filteredProducts} 
        onDelete={deleteProduct} 
      />
      <button className="add-btn" onClick={() => setShowForm(true)}>
        +
      </button>
      {showForm && <ProductForm onAdd={addProduct} onCancel={() => setShowForm(false)} />}
    </div>
  );
}

export default App;
