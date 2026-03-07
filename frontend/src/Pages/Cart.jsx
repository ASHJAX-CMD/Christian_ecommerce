import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../slices/cartSlice";
import { createOrder } from "../slices/order";
import HeaderSection from "../features/users/HeaderSection";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch();

  // ✅ Select cart and order state
  const cart = useSelector((state) => state.cart.items);
  const { loading, success, error } = useSelector((state) => state.order);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // ✅ Dispatch order on click
  const handleOrder = () => {
    if (cart.length === 0) return alert("Cart is empty!");
    dispatch(createOrder(cart));
  };

  // ✅ Clear cart after success
  useEffect(() => {
    if (success) {
      dispatch(clearCart());
      alert("Order placed successfully!");
    }
  }, [success, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderSection />
      <div className="flex">
        {/* Cart Items */}
        <div className="p-16 w-[80%] px-12">
          <div className="flex flex-col p-8 bg-white rounded-3xl gap-12">
            <h1 className="text-3xl font-semibold">Shopping Cart</h1>

            {cart.length === 0 && (
              <p className="text-gray-500">Your cart is empty.</p>
            )}

            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-start justify-between gap-6 border-b py-6"
              >
                {/* LEFT SIDE */}
                <div className="flex gap-4 flex-1">
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={`http://localhost:5000/uploads/${item.images[0]}`}
                      alt={item.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <p className="text-gray-500 text-sm max-w-md">
                      {item.description}
                    </p>
                    <button
                      onClick={() => dispatch(removeFromCart(item._id))}
                      className="text-red-500 cursor-pointer text-sm w-fit"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="flex items-center gap-3 border rounded-md px-3 py-1">
                  <button
                    onClick={() => dispatch(decreaseQty(item._id))}
                    className="text-lg"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(increaseQty(item._id))}
                    className="text-lg"
                  >
                    +
                  </button>
                </div>

                {/* PRICE */}
                <div className="text-lg font-semibold">₹{item.price}</div>
              </div>
            ))}
          </div>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>

        {/* ORDER SUMMARY */}
        <div className="bg-white flex flex-col gap-4 h-fit mt-18 rounded-3xl p-4">
          <p>SubTotal ({cart.length} Items) : ₹{total}</p>
          <p>Payment Mode: Cash (Available for Now)</p>
          <p
            onClick={handleOrder}
            className={`bg-amber-300 text-center cursor-pointer p-2 px-6 rounded-2xl ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "Proceed to Buy"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;