import React from "react";

function ProductCard({ product }) {
  const getDaysLeft = (date) => {
    const today = new Date();
    const exp = new Date(date);
    return Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
  };

  const days = getDaysLeft(product.expiryDate);
  const statusClass = days < 0 ? "expired" : days <= 30 ? "warning" : "good";

  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p className={statusClass}>
        {days < 0 ? "Süresi geçti" : `${days} gün kaldı`}
      </p>
      <p>{product.usageMonths} ay kullanılır</p>
    </div>
  );
}

export default ProductCard;
