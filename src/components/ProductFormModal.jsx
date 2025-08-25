import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../redux/productsSlice";

Modal.setAppElement("#root");

export default function ProductFormModal({ isOpen, onRequestClose, product }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.products.loading);

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    stock: "",
    thumbnail: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        price: product.price || "",
        category: product.category || "",
        description: product.description || "",
        stock: product.stock || "",
        thumbnail: product.thumbnail || product.image || "",
      });
    } else {
      setFormData({
        title: "",
        price: "",
        category: "",
        description: "",
        stock: "",
        thumbnail: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const preparedData = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock, 10),
    };
    if (product) {
      dispatch(updateProduct({ id: product.id, product: preparedData })).then(
        () => onRequestClose()
      );
    } else {
      dispatch(addProduct(preparedData)).then(() => onRequestClose());
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Product Form"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent dark overlay
          backdropFilter: "blur(6px)", // Apply blur to background
          WebkitBackdropFilter: "blur(6px)", // Safari support
          zIndex: 10000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
        content: {
          position: "relative",
          inset: "unset", // Override default inset to center modal
          padding: "25px 30px",
          borderRadius: "12px",
          maxWidth: "480px",
          width: "90vw",
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
        },
      }}
    >
      <h2>{product ? "Edit Product" : "Add New Product"}</h2>
      <form className="modal-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          required
          name="title"
          value={formData.title}
          onChange={handleChange}
        />

        <label>Price</label>
        <input
          required
          type="number"
          step="0.01"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <label>Category</label>
        <input
          required
          name="category"
          value={formData.category}
          onChange={handleChange}
        />

        <label>Stock</label>
        <input
          required
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
        />

        <label>Image URL</label>
        <input
          required
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
        />

        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        <div className="modal-buttons">
          <button disabled={loading} type="submit" className="modal-button">
            {loading ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={onRequestClose}
            className="modal-button modal-cancel"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
