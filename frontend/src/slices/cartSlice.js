import { createSlice } from "@reduxjs/toolkit";

// 1️⃣ Load from localStorage
const loadCartFromStorage = () => {
  try {
    const data = localStorage.getItem("cart");
    return data ? JSON.parse(data) : [];
  } catch (error) {
    return [];
  }
};

const initialState = {
  items: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find(
        item => item._id === product._id
      );

      if (existing) {
        existing.cartQuantity += 1;
        console.log(JSON.parse(JSON.stringify(state.items)));
      } else {
        state.items.push({ ...product, cartQuantity: 1 });
        console.log(JSON.parse(JSON.stringify(state.items)));
      }
    },

    increaseQty: (state, action) => {
      const item = state.items.find(
        item => item._id === action.payload
      );
      if (item) item.cartQuantity += 1;
    },

    decreaseQty: (state, action) => {
      const item = state.items.find(
        item => item._id === action.payload
      );
      if (item) {
        item.cartQuantity -= 1;
        if (item.cartQuantity <= 0) {
          state.items = state.items.filter(
            i => i._id !== action.payload
          );
        }
      }
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        item => item._id !== action.payload
      );
    },

    clearCart: (state) => {
      state.items = [];
    }

  }
});

export const {
  addToCart,
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;