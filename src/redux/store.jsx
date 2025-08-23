import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import { loadState, saveState } from "../utils/localStorage";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState({
    products: store.getState().products,
  });
});

export default store;
