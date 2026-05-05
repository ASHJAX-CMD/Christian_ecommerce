import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart,
} from "../slices/cartSlice";
import { createOrder, resetOrderState } from "../slices/order";
import HeaderSection from "../features/users/HeaderSection";
import { loadRazorpay } from "../utils/loadRazorpay";
import CartSkeleton from "../Skeleton/CartSkeleton";
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Cart = () => {
  const dispatch = useDispatch();
  const id = import.meta.env.VITE_RAZORPAY_KEY_ID; 
  const { addresses } = useSelector((state) => state.address);
  // ✅ Select cart and order state
  const cart = useSelector((state) => state.cart.items);
  const { loading, error } = useSelector((state) => state.order);
  const defaultAddress = addresses?.find((addr) => addr.is_default);
  const total = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0);
  const {user} = useSelector((state)=>state.user)
  // ✅ Dispatch order on click
  const handleOrder = async () => {
    if(!user)return alert("Please Login/SignUp First!")
    if (cart.length === 0) return alert("Cart is empty!");
    if (addresses.length === 0) return alert("No address Found!");

    try {
      if (!defaultAddress) {
        return alert("No default address found!");
      }
      const orderData = {
        cart: cart,
        addressId: defaultAddress.id,
      };
      const result = await dispatch(createOrder(orderData)).unwrap();

      const orderId = result.id; // backend order id
      console.log("Razorpay:", window.Razorpay);

      handlePayment(orderId);
    } catch (err) {
      console.error(err);
    }
  };
  const handlePayment = async (orderId) => {
    try {
       // 🔥 load SDK dynamically
    const isLoaded = await loadRazorpay();

    if (!isLoaded) {
      alert("Failed to load payment system. Check your internet.");
      return;
    }

    if (!window.Razorpay) {
      alert("Razorpay not available. Try again.");
      return;
    }
    
      // 1️⃣ Call backend to create Razorpay order
      const res = await fetch(
        `${VITE_BACKEND_URL}/api/payment/create-order`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ orderId }),
        },
      );

      const data = await res.json();

      // 2️⃣ Razorpay checkout options
      const options = {
        key: id,
        amount: data.amount,
        currency: data.currency,
        order_id: data.razorpayOrderId,

        name: "FrameO",
        description: "Order Payment",

        handler: async function (response) {
          // 3️⃣ Send payment info to backend
          const verifyRes = await fetch(
             `${VITE_BACKEND_URL}/api/payment/verify`
           ,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
              body: JSON.stringify(response),
            },
          );
          const data = await verifyRes.json();
          if (data.success) {
            alert("Payment Successful");
            dispatch(clearCart());
            alert("Order placed successfully!");
            dispatch(resetOrderState()); // ✅ reset success
          } else {
            alert("Payment verification failed ❌");
          }
        },

        prefill: {
          name: "Customer Name",
          email: "customer@email.com",
        },

        theme: {
          color: "#000",
        },
      };

      // 4️⃣ Open Razorpay checkout
      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", function (response) {
        console.log(response.error);
        alert("Payment Failed ❌");
      });

      rzp.open();
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) return <CartSkeleton />;
  
  return (
    <div className="min-h-screen bg-gray-100">
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
                      src={`${item.images[0]}`}
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
                  <span>{item.cartQuantity}</span>
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
          <p>
            SubTotal ({cart.length} Items) : ₹{total}
          </p>
          <p>Payment Mode: Cash (Available for Now)</p>
          {defaultAddress && (
            <div>
              <p>Delivering to Default Address</p>
              <div className="border p-2 rounded">
                <p>Street: {defaultAddress.street}</p>
                <p>City: {defaultAddress.city}</p>
                <p>State: {defaultAddress.state}</p>
                <p>ZipCode: {defaultAddress.zip}</p>
                <p>Country: {defaultAddress.country}</p>
              </div>
              <p>To change Default address Go to Profile Tab</p>
            </div>
          )}
          <p
            onClick={() => {
              handleOrder();
            }}
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
