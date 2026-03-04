import Rating from "../../features/users/Rating";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
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
          <Rating rating={null} />
          <button className="w-full mt-3 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
            <FaShoppingCart />
            Add to Cart
          </button>
          <button className="w-full mt-3 flex items-center justify-center gap-2 bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
            Shop Now !
          </button>
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
