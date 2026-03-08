import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createAddress = createAsyncThunk(
  "create/address",
  async (addressData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/address/",
        addressData,
        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      console.log("API ERROR:", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const fetchAddresses = createAsyncThunk(
  "fetch/addresses",
  async (userId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/address/fetchAddresses",

        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      console.log("API errror", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);
export const deleteAddress = createAsyncThunk(
  "delete/Address",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/address/${id}`,
        { withCredentials: true },
      );
      return { id };
    } catch (error) {
      console.log("API error", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);
export const updateAddress = createAsyncThunk(
  "update/Address",
  async ({ id, updatedAddress }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/address/${id}`,
        updatedAddress,
        { withCredentials: true },
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);
const addressSlice = createSlice({
  name: "address",

  initialState: {
    addresses: [],
    address: null,
    loading: false,
    error: null,
    success: false,
    loading1: false,
    error1: null,
    success1: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.address = action.payload.address;
        state.addresses.push(action.payload.address);
      })

      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAddresses.pending, (state) => {
        state.loading1 = true;
        state.error1 = null;
        state.success1 = false;
      })

      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading1 = false;
        state.success1 = true;
        state.addresses = action.payload.addresses;
      })

      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading1 = false;
        state.error1 = action.payload;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.loading1 = true;
        state.error1 = null;
        state.success1 = false;
      })

      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading1 = false;
        state.success1 = true;

        state.addresses = state.addresses.filter(
          (addr) => addr.id !== action.payload.id,
        );
      })

      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading1 = false;
        state.error1 = action.payload;
      });
  },
});
export default addressSlice.reducer;
