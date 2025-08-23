import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setFilter } from "../redux/productsSlice";

export default function SearchFilter() {
  const dispatch = useDispatch();
  const { search, filter, products } = useSelector((state) => state.products);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  return (
    <div className="search-filter-container">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}
        className="search-input"
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />
      <select
        value={filter}
        className="filter-select"
        onChange={(e) => dispatch(setFilter(e.target.value))}
      >
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
