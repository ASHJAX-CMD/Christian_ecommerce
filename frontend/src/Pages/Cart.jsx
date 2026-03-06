import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../slices/cartSlice";
import HeaderSection from "../features/users/HeaderSection";
const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderSection />
      {/* Cartsectionstart */}
      <div className="flex " >
        <div className="p-16 w-[80%] px-20">
        <div className="flex flex-col p-8 bg-white rounded-3xl gap-12">
          <h1 className="text-3xl font-semibold">Shopping Cart</h1>
          {console.log(cart)}
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-start justify-between gap-6 border-b py-6"
            >
              {/* LEFT SIDE */}
              <div className="flex gap-4 flex-1">
                {/* Product Image */}
                <div className="w-32 h-32 flex-shrink-0">
                  <img
                    src={`http://localhost:5000/uploads/${item.images[0]}`}
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Product Info */}
                <div className="flex flex-col gap-2">
                  <h3 className="font-semibold text-lg">{item.name}</h3>

                  <p className="text-gray-500 text-sm max-w-md">
                    {item.description}
                  </p>

                  {/* Remove Button */}
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

       
      </div>
      <div className="bg-white flex flex-col gap-4  h-fit mt-18 rounded-3xl p-4" >
         
         <p> SubTotal ({cart.length} Items) : ${total}</p>
         <p>Payement Mode: Cash (Available for Now)</p>
         <p className="bg-amber-300 text-center cursor-pointer p-2 px-6 rounded-2xl" >Proceed to Buy</p>
      </div>
      </div>
      
    </div>
  );
};
export default Cart;
