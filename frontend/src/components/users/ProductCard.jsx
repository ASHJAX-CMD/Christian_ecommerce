import Rating from "../../features/users/Rating";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQty, increaseQty } from "../../slices/cartslice";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const item = cartItems.find((i) => i._id === product._id);
  const counts = item?.cartQuantity || 0;
  const [count, setCount] = useState(counts);
  const handleShopNow = () => {
    dispatch(addToCart(product));
    setIsAdded(true);
    setCount((prev) => prev + 1);
    console.log(item);
    setTimeout(() => {
      setIsAdded(false);
    }, 5000);
  };
  const handleShopNow1 = () => {
    dispatch(addToCart(product));
    // setIsAdded(true);
    // setCount((prev) => prev + 1);
    // console.log(item)
    // setTimeout(() => {
    //   setIsAdded(false);
    // }, 5000);
    navigate("/cart");
  };
  return (
    <div k className="p-2 rounded-xl  bg-white">
      <img
        className="  h-86"
        src={`${BASE_URL}/uploads/${product.images[0]}`}
        alt=""
      />
      {console.log(product)}
      <div className="flex  bg-white  p-4 flex-col gap-1">
        <section>
          <p className="font-extrabold">{product.name}</p>
          <p>Frame, black, 12x16 "</p>
        </section>
        <p className="font-extrabold text-2xl">{product.price}</p>
        <section>
          <div className="flex flex-col gap-2">
            <Rating rating={null} />
            <p>Stock Left: {product.quantity}</p>
          </div>
          <button
            onClick={handleShopNow}
            className={`w-full mt-3 flex items-center justify-center gap-2 cursor-pointer py-2 rounded-md transition-all duration-300
    ${isAdded ? "bg-white text-black" : "bg-black text-white"}
  `}
          >
            <FaShoppingCart />

            {/* ✅ Correct conditional rendering */}
            {isAdded ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent parent click
                    setCount((prev) => Math.max(prev - 1, 0));
                    dispatch(decreaseQty(product._id));
                  }}
                  className="px-2 bg-gray-200 rounded"
                >
                  -
                </button>

                <span>{count}</span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setCount((prev) => prev + 1);
                    dispatch(increaseQty(product._id));
                  }}
                  className="px-2 bg-gray-200 rounded"
                >
                  +
                </button>
              </div>
            ) : (
              "Add to Cart"
            )}
          </button>
          <button
            onClick={handleShopNow1}
            className="w-full mt-3 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Shop Now !
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
