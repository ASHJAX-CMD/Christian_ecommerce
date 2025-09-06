import React, { useEffect, useRef, useState } from "react";
import { AiTwotoneDelete } from "react-icons/ai";
import { getAllProducts } from "../../slices/product";
import { useDispatch, useSelector } from "react-redux";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LiveProducts = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(
    (state) => state.products
  );

  const dialogRef = useRef();
  const [selectedProductId, setSelectedProductId] = useState(null);

  const openDialog = (id) => {
    setSelectedProductId(id);
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
    setSelectedProductId(null);
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/api/products/${id}`)
      .then(() => {
        dispatch(getAllProducts()); // refresh list
        closeDialog();
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col gap-2">
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <div
            key={p._id}
            className="flex flex-col gap-3 border p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">{p.name}</h3>

              <div className="flex gap-4 items-center">
                <CiEdit
                  onClick={() => navigate(`/admin/products/edit/${p._id}`)}
                  className="text-xl cursor-pointer hover:text-blue-600 transition"
                />
                <AiTwotoneDelete
                  onClick={() => openDialog(p._id)}
                  className="text-xl cursor-pointer text-red-500 hover:text-red-700 transition"
                />
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
                  src={`http://localhost:5000/uploads/${img}`}
                  alt={p.name}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* One modal reused for all products */}
      <dialog ref={dialogRef} className="p-6 rounded-lg shadow-lg">
        <p>Are you sure you want to delete this product?</p>
        <div className="flex gap-3 mt-4">
          <button
            onClick={closeDialog}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(selectedProductId)}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default LiveProducts;
