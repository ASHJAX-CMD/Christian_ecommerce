import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/user";

const Profile = () => {
  const { user, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please login</p>;

  return (
    <div className="min-h-screen p-10 bg-gray-100">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-8">

        {/* User Info */}
        <div className="border-b pb-6 mb-6">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <p className="mt-2 text-lg">{user.name}</p>
          <p className="text-gray-600">{user.email}</p>
        </div>

        {/* Orders Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
          <p className="text-gray-500">No orders yet</p>
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
  );
};

export default Profile;