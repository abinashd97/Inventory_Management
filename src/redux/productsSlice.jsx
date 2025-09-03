import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productsApi from "../api/productsApi";

// Async thunks for CRUD operations
// Async thunk to fetch product list
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  return await productsApi.getProducts();
});

// Async thunk to add a product
export const addProduct = createAsyncThunk("products/add", async (product) => {
  return await productsApi.addProduct(product);
});

// Async thunk to update a product
export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, product }) => {
    return await productsApi.updateProduct(id, product);
  }
);

// Async thunk to delete a product by ID
export const deleteProduct = createAsyncThunk("products/delete", async (id) => {
  return await productsApi.deleteProduct(id);
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [], // Product list
    loading: false, // Loading state during async operations
    error: null, // Store error messages
    search: "", // Search input text
    filter: "", // Category filter
    sort: "", // Sort order
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload; // Update search string
    },
    setFilter(state, action) {
      state.filter = action.payload; // Update filter category
    },
    setSort(state, action) {
      state.sort = action.payload; // Update sort option
    },
  },
  extraReducers: (builder) => {
    builder

      // Fetch products lifecycle
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add product lifecycle
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update product lifecycle
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.products.findIndex(
          (p) => p.id === action.payload.id
        );
        if (index !== -1) state.products[index] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete product lifecycle
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;

        // Remove deleted product by id (action.meta.arg has id)
        state.products = state.products.filter((p) => p.id !== action.meta.arg);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearch, setFilter, setSort } = productsSlice.actions;
export default productsSlice.reducer;
