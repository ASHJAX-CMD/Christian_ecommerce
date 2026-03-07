import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/product';
import userReducer from './slices/user';
import cartReducer from './slices/cartSlice';
import orderReducer from "./slices/order";
const store = configureStore({
  reducer: {
    products: productReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer
  },
});

// 🔥 Persist cart automatically
store.subscribe(() => {
  const {
    cart: { items }
  } = store.getState();

  localStorage.setItem("cart", JSON.stringify(items));
});

export default store;