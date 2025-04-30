import React from "react";
import ProductCard from "./ProductCard";

function ProductGrid({ products, onDelete }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <ProductCard product={product} />
          <button 
            className="delete-btn" 
            onClick={() => onDelete(product.id)}  // Silme işlemi
          >
            Sil
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
