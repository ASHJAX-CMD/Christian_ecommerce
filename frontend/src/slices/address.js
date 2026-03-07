import { asyncThunkCreator, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createAddress = createAsyncThunk(
    "create/address", async (addressData,{rejectWithValue})=>{
        try{
            const formData = new FormData();
            Object.keys(addressData).forEach((key)=>{
                if(addressData[key]!==""){
                    formData.append(key,addressData[key])
                }
            })
            const res = await axios.post(
                "http://localhost:5000/api/address/",
                addressData,
                {withCredentials:true}
            )
            return res.data;

        } catch (error) {
      console.log("API ERROR:", error);
      return rejectWithValue(error.response?.data?.message);
    }
    }
)

const addressSlice = createSlice({
  name: "address",

  initialState: {
    address: null,
    loading: false,
    error: null,
    success: false
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
      })

      .addCase(createAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});
export default addressSlice.reducer;