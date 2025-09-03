import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProduct } from "../redux/productsSlice";

export default function ProductList({ onEdit }) {
  const dispatch = useDispatch();
  const { products, search, filter, sort, loading, error } = useSelector(
    (state) => state.products
  );

  // Filter products by search text and selected category
  let filtered = products;

  if (search) {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (filter) {
    filtered = filtered.filter((p) => p.category === filter);
  }

  // Sort products by selection
  if (sort === "priceAsc") {
    filtered = filtered.slice().sort((a, b) => a.price - b.price);
  } else if (sort === "priceDesc") {
    filtered = filtered.slice().sort((a, b) => b.price - a.price);
  } else if (sort === "nameAsc") {
    filtered = filtered.slice().sort((a, b) => a.title.localeCompare(b.title));
  } else if (sort === "nameDesc") {
    filtered = filtered.slice().sort((a, b) => b.title.localeCompare(a.title));
  }

  if (loading) return <p className="loading-message">Loading products...</p>;
  if (error) return <p className="error-message">Error: {error}</p>;

  if (filtered.length === 0)
    return (
      <p style={{ textAlign: "center", marginTop: 40 }}>No products found.</p>
    );

  return (
    <div className="product-grid">
      {filtered.map((product) => (
        <div key={product.id} className="product-card">
          <img
            src={product.thumbnail || product.image}
            alt={product.title}
            className="product-image"
          />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-category">{product.category}</p>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p
            className={`stock-status ${
              product.stock > 0 ? "in-stock" : "out-of-stock"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <div className="action-buttons">
            <button className="action-button" onClick={() => onEdit(product)}>
              Edit
            </button>
            <button
              className="action-button delete-button"
              onClick={() => {
                if (
                  window.confirm(
                    `Delete "${product.title}"? This action is irreversible.`
                  )
                ) {
                  dispatch(deleteProduct(product.id));
                }
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
