import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
  clearCart
} from "../slices/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.items);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h1>Cart</h1>

      {cart.map(item => (
        <div key={item._id}>
          <h3>{item.name}</h3>

          <button onClick={() => dispatch(decreaseQty(item._id))}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => dispatch(increaseQty(item._id))}>+</button>

          <button onClick={() => dispatch(removeFromCart(item._id))}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ${total}</h2>
    </div>
  );
};
export default Cart;