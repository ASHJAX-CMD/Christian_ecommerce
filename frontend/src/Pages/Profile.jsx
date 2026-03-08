import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/user";
import HeaderSection from "../features/users/HeaderSection";
import { useEffect, useState } from "react";
import { fetchOrders } from "../slices/order";
import { createAddress, deleteAddress, fetchAddresses } from "../slices/address";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const { orders } = useSelector((state) => state.order);
  const { addresses } = useSelector((state) => state.address);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    isDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAddress(formData));

    console.log(formData);

    setShowForm(false);

    setFormData({
      street: "",
      city: "",
      state: "",
      pincode: "",
      isDefault: false,
      country: "",
    });
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
                </div>
              ))}
              <div className="mt-6">
                {/* Add Address Button */}
                <button
                  onClick={() => setShowForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Add Address
                </button>

                {/* Address Form */}
                {showForm && (
                  <form
                    onSubmit={handleSubmit}
                    className="mt-4 bg-gray-50 p-6 rounded-lg shadow flex flex-col gap-4 max-w-md"
                  >
                    <h3 className="text-lg font-semibold">Add Address</h3>

                    <input
                      type="text"
                      name="street"
                      placeholder="Street"
                      value={formData.street}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />

                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />

                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />

                    <input
                      type="text"
                      name="zip"
                      placeholder="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />
                    <input
                      type="text"
                      name="country"
                      placeholder="Country"
                      value={formData.country}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isDefault"
                        checked={formData.isDefault}
                        onChange={handleChange}
                      />
                      Set as Default Address
                    </label>

                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded"
                      >
                        Save Address
                      </button>

                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="px-4 py-2 bg-gray-400 text-white rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
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
