import React, { useEffect, useState } from "react";
import Addproduct from "./Addproduct";
import { MdNotificationsNone } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";
import LiveProducts from "./LiveProducts";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../slices/product";

const Products = () => {
  const [add, setAdd] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [page, newPage] = useState(1);
  const [filter, setFilter] = useState({
    color: [],
    size: [],
    price: [0, 5000],
  });
  const fetchProducts = () => {
    const params = {
      page,
      limit: 8,
    };

    if (filter.size.length > 0) {
      params.size = filter.size;
    }

    if (filter.color.length > 0) {
      params.color = filter.color;
    }

    console.log("FINAL PARAMS:", params);
    dispatch(getAllProducts(params));
  };
  useEffect(() => {
    console.log("FETCH TRIGGERED");
    fetchProducts();
  }, [page, filter]);
  useEffect(() => {
    newPage(1);
  }, [filter]);

  const {
    items: products,
    loading,
    error,
    totalCount,
  } = useSelector((state) => state.products);
  const hasMore = products.length < totalCount;
  const currentLocation = () => {
    if (location.pathname === "/admin/products") {
      return true;
    }
    return false;
  };

  return (
    <div className="flex flex-col min-h-screen w-full p-4 gap-10">
      {/* Header Section */}
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full bg-white p-4 rounded-xl justify-between items-center shadow-sm">
          {/* Search Bar */}
          <div className="flex gap-2 w-full max-w-md">
            <input
              type="search"
              name="Search"
              placeholder="Search products..."
              className="border w-full rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
              type="submit"
            >
              Search
            </button>
          </div>

          {/* Add Products Button */}

          <div className="flex items-center gap-4">
            <MdNotificationsNone className="text-2xl" />
            <div className="relative p-[2px] rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[length:200%_200%] animate-border-flow">
              <Link
                to={`${currentLocation() ? "/admin/products/addproduct" : "/admin/products"} `}
              >
                <div
                  onClick={() => {
                    setAdd(!add);
                  }}
                  className="rounded-xl bg-white px-4 py-2 font-bold text-center cursor-pointer hover:bg-gray-50 transition"
                >
                  {currentLocation() ? "Add New Products" : "Live Products !"}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <p className="font-extrabold mt-4 text-2xl">Products:</p>
      {/* Products Grid */}
      <div>
        <Outlet context={{ products, loading, error, page, newPage }} />
      </div>
      {hasMore && (
        <div className="mt-4">
          <div className="flex justify-center">
            <p
              onClick={() => newPage((prev) => prev + 1)}
              className="bg-white  font-semibold  p-2 px-6 w-fit rounded-4xl"
            >
              Load More!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
