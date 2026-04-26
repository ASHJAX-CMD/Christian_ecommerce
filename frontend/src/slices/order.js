import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createOrder = createAsyncThunk(
  "order/createOrder",
  async ({ cart, addressId }, { rejectWithValue }) => {
    try {
      const items = cart.map((orderItem) => ({
        productId: orderItem._id,
        quantity: orderItem.cartQuantity,
      }));
      const cartData = {
        items: items,
        address: addressId,
      };
      const res = await axios.post(
        "http://localhost:5000/api/orders",
        cartData,
        { withCredentials: true },
      );
      console.log("Sent cart Data", cartData);
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

export const fetchOrdersAdmin = createAsyncThunk(
  "order/fetchOrdersAdmin",
  async (_, { rejectWithValue }) => {
    try {
      console.log("FETCH ORDERS CALLED");
      
      const res = await axios.get(
        "http://localhost:5000/api/orders/admin/all",
        {
          withCredentials: true,
        },
      );

      console.log("API RESPONSE:", res.data);

      return res.data;
    } catch (error) {
      console.log("API ERROR:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const fetchOderDetails = createAsyncThunk(
  "order/fetchOrderDetails",
  async (id, { rejectWithValue }) => {
   
    try {
      const orderId = id;
      const res = await axios.get(
        `http://localhost:5000/api/orders/admin/${orderId}`,
        {
          withCredentials: true,
        },
      );
      console.log("res from api", res.data);
      return res.data;
    } catch (error) {
      console.log("API Error", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const refund = createAsyncThunk(
  "order/refund",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `http://localhost:5000/api/payment/verify/refund/${id}`,
        {}, // empty body
        { withCredentials: true }, // config
      );

      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const updateOrderStatus = createAsyncThunk(
  "order/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/orders/status/${id}`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // if using cookies/JWT
        },
      );

      return res.data; // updated order
    } catch (err) {
      return rejectWithValue(
        err.response?.data || { message: "Something went wrong" },
      );
    }
  },
);

export const fetchOrderStats = createAsyncThunk(
  "order/fetchOrderStats",
  async (_, { rejectWithValue }) => {
    
    try {
      const res = await axios.get(
        "http://localhost:5000/api/orders/admin/dashboard/ordertotaldetails",
        { withCredentials: true },
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    orderDetails: null,
    orderStats: {},
    totalProducts:0,
    lowStock:0,
    order: null,
    loading: false,
    loadingAdminOrders:true,
    loadingOrderStats:false,
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
      })
      .addCase(fetchOrdersAdmin.pending, (state, action) => {
        state.loadingAdminOrders = true;
        state.error = action.payload;
      })
      .addCase(fetchOrdersAdmin.fulfilled, (state, action) => {
        state.loadingAdminOrders = false;

        state.orders = action.payload;
      })
      .addCase(fetchOrdersAdmin.rejected, (state) => {
        state.loadingAdminOrders = false;
        state.error = null;
      })
      .addCase(fetchOderDetails.pending, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(fetchOderDetails.fulfilled, (state, action) => {
        state.loading = false;

        state.orderDetails = action.payload;
      })
      .addCase(fetchOderDetails.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(refund.pending, (state, action) => {
        state.loading = true;
        state.error = action.payload;
      })
      .addCase(refund.fulfilled, (state, action) => {
        state.loading = false;

        // state.orderDetails.status = action.payload;
      })
      .addCase(refund.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetails = action.payload; // update UI instantly
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message;
      })
      .addCase(fetchOrderStats.pending, (state) => {
        state.loadingOrderStats = true;
      })
      .addCase(fetchOrderStats.fulfilled, (state, action) => {
        state.loadingOrderStats = false;

        // convert array → object for easy use

        state.orderStats = action.payload; // ✅ array
        // state.totalProducts = action.payload.totalProducts;
        // state.lowStock = action.payload.lowStock;
      })
      .addCase(fetchOrderStats.rejected, (state, action) => {
        state.loadingOrderStats = false;
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
export const { resetOrderState } = orderSlice.actions;
