import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  replace,
} from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import ProtectedAdmin from "./components/admin/Protected";
import Splash from "./Splash";

import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Reviews from "./components/admin/Reviews";
import Orders from "./components/admin/Orders.jsx";
import Addproduct from "./components/admin/Addproduct";
import LiveProducts from "./components/admin/LiveProducts";
import Register from "./Pages/Registration";
import Login from "./Pages/Login";
import Protected from "./components/users/Protected";
import { fetchCurrentUser } from "./slices/user";
import EditProduct from "./components/admin/EditProduct";
import Product from "./Pages/Product";
import Products from "./components/admin/Products";
import { getAllProducts } from "./slices/product";
import Profile from "./Pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cart from "../src/Pages/Cart";
import { fetchOrders } from "./slices/order";
import Design from "./Pages/Design";
import Offers from "./Pages/Offers";
import { fetchAddresses } from "./slices/address";
import OrderDetails from "./components/admin/OrderDetails.jsx";
import Dashboard from "./components/admin/Dashboard.jsx";


function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllProducts({}));
    dispatch(fetchAddresses());
  }, [dispatch]);

  return (
      <>
      <ToastContainer
        position="top-right"
        autoClose={5000}       // ⏱ duration
        hideProgressBar={false} // 📉 progress bar visible
        newestOnTop={true}
        closeOnClick
        pauseOnHover           // ⏸ pause progress on hover
        draggable
        theme="dark"
      />
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/design&support" element={<Design />} />
      <Route path="/offers" element={<Offers />} />

      {/* Protected Routes */}
      <Route path="/home" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product" element={<Product />} />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <Admin />
          </ProtectedAdmin>
        }
      >
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="products" element={<Products />}>
          <Route path="addproduct" element={<Addproduct />} />
          <Route index element={<LiveProducts />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Route>
        <Route path="reviews" element={<Reviews />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<OrderDetails />} />
      </Route>

      {/* Default route */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
      </>

  );
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </Provider>
  );
}
