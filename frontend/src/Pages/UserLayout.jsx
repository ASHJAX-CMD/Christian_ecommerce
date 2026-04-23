import { Outlet } from "react-router-dom";
import HeaderSection from "../features/users/HeaderSection";
import Footer from "../features/users/Footer";

const UserLayout = () => {
  return (
    <>
      <HeaderSection />

      <main className="min-h-screen">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default UserLayout;