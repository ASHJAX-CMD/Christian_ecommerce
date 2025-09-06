import React, { useEffect } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { getAllProducts } from "../../slices/product";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { Navigate, useNavigate } from "react-router-dom";
const LiveProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col gap-2">
      {console.log(products)}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p, i) => (
          <div
            key={i}
            className="flex flex-col gap-3 border p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{p.brand}</h3>
              {console.log(p.brand)}
            <div className="flex gap-4 items-center" >
                <CiEdit onClick={() => navigate(`/admin/products/edit/${p._id}`)} className="text-xl  cursor-pointer hover:text-red-700 transition" />
              <AiTwotoneDelete className="text-xl cursor-pointer text-red-500 hover:text-red-700 transition" />
            </div>
            </div>

            <p>
              <span className="font-bold">Description:</span> {p.description}
            </p>
            <p>
              <span className="font-bold">Price:</span> ₹{p.price}
            </p>
            <p>
              <span className="font-bold">Discount:</span> {p.discount}%
            </p>
            <p>
              <span className="font-bold">Tags:</span> {p.tags}
            </p>

            <div className="flex gap-3 flex-wrap">
              {p.images?.map((img, j) => (
                <img
                  key={j}
                  src={`http://localhost:5000/uploads/${img}`}  // make sure your backend sends full URLs or prepend host
                  alt={p.name}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveProducts;
