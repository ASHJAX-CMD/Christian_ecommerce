import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for login
export const fetchUser = createAsyncThunk(
  "user/login",
  async (credential, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/login",
        { email: credential.email, password: credential.password },
        { withCredentials: true } // <-- important for cookies
      );

      // Backend should return user details along with cookie
      return res.data.user; // assume backend sends { user: {id, name, email} }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  "user/register",
  async (credential, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/register",
        {
          email: credential.email,
          password: credential.password,
          name: credential.fullName,
        },
        { withCredentials: true }
      );

      return res.data; // success → goes to fulfilled
    } catch (error) {
      return rejectWithValue(error.response?.data); // error → goes to rejected
    }
  }
);


export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/user/me", {
        withCredentials: true, // send cookie
      });
      return res.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: true,
    error: null,
    success: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.success = false;
      // optionally call backend /logout to clear cookie
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload; // store user details
        state.success = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
       .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.success = false;
      })
      .addCase(createUser.pending, (state)=>{
        state.loading =true;
        state.error = null;
        state.success = false;
      })
      .addCase(createUser.fulfilled,(state)=>{
        state.loading = false;
        state.user = null;
        state.success= true;
      })
      .addCase(createUser.rejected,(state, action)=>{
        state.loading = false;
        state.user = action.payload?.message || "Registration Failed";
        state.success= false;
      })
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
