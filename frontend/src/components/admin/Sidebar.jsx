import { Link } from "react-router-dom";
import img from "../../../public/images/img.jpg";
import { useSelector } from "react-redux";

const Sidebar = ({ pathname }) => {
  const user = useSelector((state)=>state.user.user);

  return (
    <div className="h-full lg:w-64">
      <div className="bg-black h-full  text-white  gap-16 p-4 flex flex-col align-center  ">
        <div className="flex flex-col profile   items-center">
          <div className=" flex justify-center  mt-2 ">
            <img
              className=" border-green-500 w-2/3 border-2 rounded-full"
              src={img}
              alt=""
            />
          </div>
          {console.log(user)}
          <p className="text-white">{user.name}</p>
        </div>
        <div className="flex flex-col gap-16 ml-2 justify-center">
          <Link
            to="/admin/products"
            className={`h-full rounded-2xl p-2 ${
              pathname === "/admin/products"
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
              pathname === "/admin/orders"
                ? "border border-green-400"
                : "border-none"
            } `}
          >
            Orders
          </Link>
          <Link
            to="/admin/reviews"
            className={`h-full rounded-2xl p-2 ${
              pathname === "/admin/reviews"
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
