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
    setEditProduct(null); // No product selected for add
    setModalOpen(true); // Open modal
  };

  const openEditModal = (product) => {
    setEditProduct(product); // Set product to edit
    setModalOpen(true); // Open modal
  };

  return (
    <div className="app-container">
      {/* Fixed header container outside main content width */}
      <header className="fixed-header">
        <div className="header-inner">
          <h1 className="app-title">Inventory Management Dashboard</h1>
          <p className="app-subtitle">Manage your products efficiently</p>

          <div className="header-controls">
            <button className="app-button" onClick={openAddModal}>
              Add New Product
            </button>
            <SearchFilter />
            <SortOptions />
          </div>
        </div>
      </header>

      {/* Push down main content so it doesn't hide below fixed header */}
      <main className="main-content">
        <ProductList onEdit={openEditModal} />
      </main>

      <ProductFormModal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        product={editProduct}
      />
    </div>
  );
}

export default App;
