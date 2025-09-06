import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/product'
import userReducer from './slices/user';
export default configureStore({
  reducer: {
    products: productReducer,
    user:userReducer,
  },
});