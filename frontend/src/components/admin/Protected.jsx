import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ClipLoader } from "react-spinners";

const ProtectedAdmin = ({ children }) => {
  const { user, loading } = useSelector(state => state.user);

  // Show loader while fetching user
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader
          color="#ffffff"
          loading={true}
          size={150}
        />
      </div>
    );
  }

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect if not admin
  if (user.role !== "admin") {
    alert("You are not an admin!");
    return <Navigate to="/home" replace />;
  }

  // All checks passed, render admin pages
  return children;
};

export default ProtectedAdmin;
