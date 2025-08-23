import axios from "axios";

const BASE_URL = "https://dummyjson.com/products";

const productsApi = {
  getProducts: async () => {
    const res = await axios.get(BASE_URL);
    return res.data.products;
  },
  addProduct: async (product) => {
    const res = await axios.post(`${BASE_URL}/add`, product);
    return res.data;
  },
  updateProduct: async (id, product) => {
    const res = await axios.put(`${BASE_URL}/${id}`, product);
    return res.data;
  },
  deleteProduct: async (id) => {
    const res = await axios.delete(`${BASE_URL}/${id}`);
    return res.data;
  },
};

export default productsApi;
