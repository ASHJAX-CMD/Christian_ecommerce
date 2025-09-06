import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import ProtectedAdmin from "./components/admin/Protected";
import Splash from "./Splash";
import Home from "./Pages/Home";
import Admin from "./Pages/Admin";
import Products from "./components/admin/Products";
import Reviews from "./components/admin/Reviews";
import Orders from "./components/admin/Orders";
import Addproduct from "./components/admin/Addproduct";
import LiveProducts from "./components/admin/LiveProducts";
import Register from "./Pages/Registration";
import Login from "./Pages/Login";
import Protected from "./components/users/Protected";
import { fetchCurrentUser } from "./slices/user";
import EditProduct from "./components/admin/EditProduct"
function AppContent() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    
    dispatch(fetchCurrentUser());
  }, [dispatch]);



  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedAdmin>
            <Admin />
          </ProtectedAdmin>
        }
      >
        <Route path="products" element={<Products />}>
          <Route path="addproduct" element={<Addproduct />} />
          <Route index element={<LiveProducts />} />
          <Route path="edit/:id" element={<EditProduct/>}/>
        </Route>
        <Route path="reviews" element={<Reviews />} />
        <Route path="orders" element={<Orders />} />
      </Route>

      {/* Default route */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
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
