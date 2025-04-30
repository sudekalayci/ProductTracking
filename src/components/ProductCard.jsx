import React from "react";

function ProductCard({ product, onDelete, onEdit }) {
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
      <p className="product-category">{product.category}</p>
      <p className={statusClass}>
        {days < 0 ? "Süresi geçti" : `${days} gün kaldı`}
      </p>
      <p className="usage-info">{product.usageMonths} ay kullanılır</p>
      <div className="card-buttons">
        <button className="edit-btn" onClick={() => onEdit(product)}>Düzenle</button>
        <button className="delete-btn" onClick={() => onDelete(product.id)}>Sil</button>
      </div>
    </div>
  );
}

export default ProductCard;

