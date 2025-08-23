import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSort } from "../redux/productsSlice";

export default function SortOptions() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.products.sort);

  return (
    <div className="sort-container">
      Sort By:{" "}
      <select
        value={sort}
        className="sort-select"
        onChange={(e) => dispatch(setSort(e.target.value))}
      >
        <option value="">None</option>
        <option value="priceAsc">Price (Low to High)</option>
        <option value="priceDesc">Price (High to Low)</option>
        <option value="nameAsc">Name (A - Z)</option>
        <option value="nameDesc">Name (Z - A)</option>
      </select>
    </div>
  );
}
