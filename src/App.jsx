import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchProducts } from "./redux/productsSlice";

import ProductList from "./components/ProductList";
import ProductFormModal from "./components/ProductFormModal";
import SearchFilter from "./components/SearchFilter";
import SortOptions from "./components/SortOptions";

import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const openAddModal = () => {
    setEditProduct(null);
    setModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setModalOpen(true);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Inventory Management Dashboard</h1>
        <p>Manage your products easily and efficiently</p>
      </header>
      <button className="app-button" onClick={openAddModal}>
        Add New Product
      </button>
      <SearchFilter />
      <SortOptions />
      <ProductList onEdit={openEditModal} />
      <ProductFormModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        product={editProduct}
      />
    </div>
  );
}

export default App;
