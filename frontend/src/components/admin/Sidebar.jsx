import { Link } from "react-router-dom";
import profile_img from "../../../public/images/profile.jpg";
import { useSelector } from "react-redux";

const Sidebar = ({ pathname }) => {
  const user = useSelector((state)=>state.user.user);

  return (
    <div className="h-full lg:w-64">
      <div className="bg-black h-full  text-white  gap-16 p-4 flex flex-col align-center  ">
        <div className="flex flex-col profile   items-center">
          <div className=" flex justify-center w-2/3  mt-2 ">
            <img
              className=" border-green-500  border-2 rounded-full"
              src={profile_img}
              alt=""
            />
          </div>
          {console.log(user)}
          <p className="text-white">{user.name}</p>
        </div>
        <div className="flex flex-col gap-16 ml-2 justify-center">
           <Link
            to="/admin/dashboard"
            className={`h-full rounded-2xl p-2 ${
              pathname.startsWith("/admin/dashboard")
                ? "border border-green-400"
                : ""
            }  `}
          >
            DashBoard
          </Link>
          <Link
            to="/admin/products"
            className={`h-full rounded-2xl p-2 ${
              pathname.startsWith("/admin/products")
                ? "border border-green-400"
                : ""
            } ${
              pathname === "/admin/products/addproduct"
                ? "border border-green-400"
                : ""
            } `}
          >
            Products
          </Link>
          <Link
            to="/admin/orders"
            className={`h-full rounded-2xl p-2 ${
              pathname.startsWith("/admin/orders")
                ? "border border-green-400"
                : "border-none"
            } `}
          >
            Orders
          </Link>
          <Link
            to="/admin/reviews"
            className={`h-full rounded-2xl p-2 ${
              pathname.startsWith("/admin/reviews")
                ? "border border-green-400"
                : "border-none"
            } `}
          >
            Reviews
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
