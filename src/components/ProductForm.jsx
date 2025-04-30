import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function ProductForm({ onAdd, onCancel, initialData }) {
  const [formData, setFormData] = useState(
    initialData || {
      name: "",
      category: "",
      usageMonths: "",
      expiryDate: "",
      image: "",
    }
  );

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToSave = {
      ...formData,
      id: initialData ? initialData.id : uuidv4(),
    };
    onAdd(productToSave);
    setFormData({
      name: "",
      category: "",
      usageMonths: "",
      expiryDate: "",
      image: "",
    });
  };

  return (
    <div className="modal">
      <form className="form" onSubmit={handleSubmit}>
        <h2>{initialData ? "Ürünü Düzenle" : "Yeni Ürün"}</h2>
        <input
          type="text"
          placeholder="Ürün adı"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Kategori"
          required
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Kaç ay kullanılır?"
          required
          value={formData.usageMonths}
          onChange={(e) => setFormData({ ...formData, usageMonths: e.target.value })}
        />
        <input
          type="date"
          required
          value={formData.expiryDate}
          onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button type="submit">{initialData ? "Güncelle" : "Kaydet"}</button>
        <button type="button" onClick={onCancel}>İptal</button>
      </form>
    </div>
  );
}

export default ProductForm;
