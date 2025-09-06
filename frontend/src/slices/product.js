// // src/store/productSlice.js
// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// // Async thunk for posting product
// export const createProduct = createAsyncThunk(
//   "products/createProduct",
//   async (productData, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();

//       // Append all fields (special handling for images & video)
//       Object.keys(productData).forEach((key) => {
//         if (key === "images") {
//           productData.images.forEach((img) => formData.append("images", img));
//         } else if (key === "video" && productData.video) {
//           formData.append("video", productData.video);
//         } else if (productData[key] !== "") {
//           formData.append(key, productData[key]);
//         }
//       });

//       const res = await axios.post(
//         "http://localhost:5000/api/products",

//         formData,

//         {
//           withCredential: true,
//           headers: {
//             "Content-Type": "multipart/form-data", // ✅ needed for file uploads
//           },
//         }
//       );

//       if (!res.ok) {
//         throw new Error("Failed to create product");
//       }

//       const data = await res.json();
//       return data; // Backend should return created product object
//     } catch (err) {
//       return rejectWithValue(err.message);
//     }
//   }
// );

// const productSlice = createSlice({
//   name: "products",
//   initialState: {
//     items: [], // list of products
//     loading: false,
//     error: null,
//     success: false,
//   },
//   reducers: {
//     resetProductState: (state) => {
//       state.loading = false;
//       state.error = null;
//       state.success = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(createProduct.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(createProduct.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         state.items.push(action.payload); // add new product to state
//       })
//       .addCase(createProduct.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload || "Something went wrong";
//       });
//   },
// });

// export const { resetProductState } = productSlice.actions;
// export default productSlice.reducer;


// src/store/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getAllProducts = createAsyncThunk(
  "products/getallproducts",
  async(_,{rejectWithValue} )=>{
  try{
    const res = await axios.get(
    "http://localhost:5000/api/products",
    {withCredentials:true}
  )
  return res.data
  }catch(error){
    return rejectWithValue(error.response.data || error.message)
  }
  }
)
// Async thunk for posting product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      // Append all fields (special handling for images & video)
      Object.keys(productData).forEach((key) => {
        if (key === "images") {
          productData.images.forEach((img) => formData.append("images", img));
        } else if (key === "video" && productData.video) {
          formData.append("video", productData.video);
        } else if (productData[key] !== "") {
          formData.append(key, productData[key]);
        }
      });

      // ✅ Proper axios POST
      const res = await axios.post(
        "http://localhost:5000/api/products",
        formData,
        {
          withCredentials: true, // ✅ correct property name
          headers: {
            "Content-Type": "multipart/form-data", // ✅ required for file upload
          },
        }
      );

      return res.data; // ✅ axios gives parsed response directly
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // list of products
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.items.push(action.payload); // add new product to state
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })
      .addCase(getAllProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.items=action.payload; // set products array
    })
    .addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch products";
    });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
  