import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
export const createAddress = createAsyncThunk(
  "create/address",
  async (addressData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
         `${VITE_BACKEND_URL}/api/address/`
        ,
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
        `${VITE_BACKEND_URL}/api/address/fetchAddresses`
       ,

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
        `${VITE_BACKEND_URL}/api/address/${id}`,
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
        `${VITE_BACKEND_URL}/api/address/${id}`,
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
        const newAddr = action.payload.address;

        if (newAddr.isDefault) {
          state.addresses.forEach((addr) => {
            addr.isDefault = false;
          });
        }

        state.addresses.push(newAddr);
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
      })
      .addCase(updateAddress.pending, (state) => {
        state.loading1 = true;
        state.error1 = null;
        state.success1 = false;
      })

      .addCase(updateAddress.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading1 = false;
        state.success1 = true;

        const updated = action.payload.address;
        if (updated.isDefault) {
          state.addresses.forEach((addr) => {
            addr.isDefault = false;
          });
        }
        console.log("check this first", updated);
        state.addresses = state.addresses.map((addr) =>
          addr.id === updated.id ? updated : addr,
        );
      })

      .addCase(updateAddress.rejected, (state, action) => {
        state.loading1 = false;
        state.error1 = action.payload;
      });
  },
});
export default addressSlice.reducer;
