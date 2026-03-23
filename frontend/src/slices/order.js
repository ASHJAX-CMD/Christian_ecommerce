import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({cart,addressId}, { rejectWithValue }) => {
    try {
      const items = cart.map((orderItem) => ({
        productId: orderItem._id,
        quantity: orderItem.cartQuantity,
      }));
const cartData = {
  items:items,
  address:addressId
}
      const res = await axios.post(
        "http://localhost:5000/api/orders",
         cartData,
        { withCredentials: true },
      );
console.log("Sent cart Data",cartData)
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);
// export const fetchOrders = createAsyncThunk(
// "order/fetchOrder",
// async (User , {rejectWithValue})=>{
//     try{
//       console.log("FETCH ORDERS CALLED");
//         const res = await axios.get(
//              "http://localhost:5000/api/orders/user/all",
//              {withCredentials:true}
//         );
//          console.log("API RESPONSE:", res.data);
//         return res.data;
//     }
//     catch(error){
//         return rejectWithValue(error.response?.data?.message)
//     }
// }
// )
export const fetchOrders = createAsyncThunk(
  "order/fetchOrder",
  async (_, { rejectWithValue }) => {
    try {
      console.log("FETCH ORDERS CALLED");

      const res = await axios.get("http://localhost:5000/api/orders/user/all", {
        withCredentials: true,
      });

      console.log("API RESPONSE:", res.data);

      return res.data;
    } catch (error) {
      console.log("API ERROR:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    order: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetOrderState: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.order = action.payload;
      })

      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        
        state.error = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        
        state.orders = action.payload;
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default orderSlice.reducer;
export const { resetOrderState } = orderSlice.actions;