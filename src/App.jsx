import React, { useState, useEffect } from "react";
import "./styles/App.css";
import ProductGrid from "./components/ProductGrid";
import ProductForm from "./components/ProductForm";
import SearchBar from "./components/SearchBar";

function App() {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("makeup-products");
    return saved ? JSON.parse(saved) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

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

  const filteredProducts = searchTerm
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  return (
    <div className="App">
      <h1>Makeup Tracker</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ProductGrid
        products={filteredProducts}
        onDelete={deleteProduct}
        onEdit={handleEditProduct}
      />
      <button className="add-btn" onClick={() => setShowForm(true)}>+</button>
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
