import axios from "axios";

const BASE_URL = "https://dummyjson.com/products";

const productsApi = {
  getProducts: async () => {
    // Fetch all products from API
    const res = await axios.get(BASE_URL);
    return res.data.products; // Return product list
  },
  addProduct: async (product) => {
    // Add new product via POST
    const res = await axios.post(`${BASE_URL}/add`, product);
    return res.data; // Return created product
  },
  updateProduct: async (id, product) => {
    // Return created product
    const res = await axios.put(`${BASE_URL}/${id}`, product);
    return res.data; // Return updated product
  },
  deleteProduct: async (id) => {
    // Return updated product
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data; // Return deleted product
  },
};

export default productsApi;
