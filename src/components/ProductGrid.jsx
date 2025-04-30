import React from "react";
import ProductCard from "./ProductCard";

function ProductGrid({ products, onDelete, onEdit }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}

export default ProductGrid;
