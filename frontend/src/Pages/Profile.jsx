import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/user";
import HeaderSection from "../features/users/HeaderSection";
import { useEffect, useState } from "react";
import { fetchOrders } from "../slices/order";

import {
  createAddress,
  deleteAddress,
  fetchAddresses,
  updateAddress,
} from "../slices/address";
import AddressForm from "../components/users/AddressForm";

const Profile = () => {
  const [mode, setMode] = useState(null); // "add" | "edit" | null
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { orders } = useSelector((state) => state.order);
  const { addresses } = useSelector((state) => state.address);
  const emptyAddress = {
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    isDefault: false,
  };
  const [formData, setFormData] = useState(emptyAddress);

  const [editingId, setEditingId] = useState(null);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEdit = (addr) => {
    setMode("edit");
    setEditingId(addr.id);

    setFormData({
      street: addr.street,
      city: addr.city,
      state: addr.state,
      zip: addr.zip,
      country: addr.country,
      isDefault: addr.isDefault,
    });
  };
  const handleAddClick = () => {
    setMode("add");
    setEditingId(null);

    setFormData(emptyAddress);
  };
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mode === "add") {
      dispatch(createAddress(formData));
    }

    if (mode === "edit") {
      dispatch(
        updateAddress({
          id: editingId,
          updatedAddress: formData,
        }),
      );
    }

    setMode(null);
    setEditingId(null);
    setFormData(emptyAddress);
  };

  useEffect(() => {
    console.log(orders);
  }, [orders]);
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login</p>;

  return (
    <div className="min-h-screen">
      {console.log(addresses)}
      <HeaderSection />
      <div>
        <div className="min-h-screen p-10 bg-gray-100">
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8">
            {/* User Info */}
            <div className="border-b pb-6 mb-6">
              <h1 className="text-3xl font-bold">My Profile</h1>
              <p className="mt-2 text-lg">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div>
              <p>Address's</p>
              {addresses?.map((addr) => (
                <div key={addr.id} className="border p-3 rounded mb-2">
                  <p>{addr.street}</p>
                  <p>
                    {addr.city}, {addr.state}
                  </p>
                  <p>
                    {addr.zip}, {addr.country}
                  </p>
                  {addr.isDefault && (
                    <p className="font-semibold text-sm border inline-block p-1 rounded">
                      Default Address
                    </p>
                  )}
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => handleEdit(addr)}
                      className="px-3 py-1 bg-white border rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => dispatch(deleteAddress(addr.id))}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
                    </button>
                  </div>
                  {editingId === addr.id && mode === "edit" && (
                    <AddressForm
                      formData={formData}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                      cancel={() => setMode(null)}
                    />
                  )}
                </div>
              ))}
              <div className="mt-6">
                {/* Add Address Button */}
                <button
                  onClick={() => handleAddClick()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Add Address
                </button>

                {/* Address Form */}
                {mode === "add" && (
                  <AddressForm
                    formData={formData}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    cancel={() => setMode(null)}
                  />
                )}
              </div>
            </div>

            {/* Orders Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">My Orders</h2>

              {orders.length === 0 ? (
                <p className="text-gray-500">No orders yet</p>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="border p-4 mb-2 rounded">
                    <p>Order ID: {order.id}</p>
                    <p>Total: ${order.total}</p>
                    <p>Status: {order.status}</p>
                  </div>
                ))
              )}
            </div>

            {/* Logout */}
            <button
              onClick={() => dispatch(logout())}
              className="mt-8 px-4 py-2 bg-black text-white rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
