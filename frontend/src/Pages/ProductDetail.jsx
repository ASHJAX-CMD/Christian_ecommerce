import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "../slices/product";
import { addToCart, decreaseQty, increaseQty } from "../slices/cartSlice";
function Stars({ value }) {
  const full = Math.floor(value);
  return (
    <div className="flex items-center gap-0.5 text-amber-500">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < full ? "fill-current" : "fill-none stroke-current"}`}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
        >
          <path d="M12 17.3l-6.18 3.7 1.64-7.03L2 9.24l7.19-.62L12 2l2.81 6.62L22 9.24l-5.46 4.73L18.18 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductPage() {
  const { productId } = useParams(); // or id depending on your route
  const dispatch = useDispatch();
  const [activeImage, setActiveImage] = useState(0);
  const [color, setColor] = useState("");
  const [size, setSize] = useState(null);
  const navigate = useNavigate();
  const [isAdded, setIsAdded] = useState(false);

  const { product, singleproductloading } = useSelector(
    (state) => state.products,
  );

  const cartItems = useSelector((state) => state.cart.items);
  const thisProduct = cartItems.find((i) => i?._id === product?._id);
  const [qty, setQty] = useState(1);
  useEffect(() => {
    if (thisProduct) {
      setQty(thisProduct.cartQuantity);
    } else {
      setQty(1);
    }
  }, [thisProduct, productId]);
  useEffect(() => {
    if (productId) {
      dispatch(fetchSingleProduct(productId));
    }
  }, [productId, dispatch]);

  if (singleproductloading || !product) return <div>Loading...</div>;

  const handleShopNow = () => {
    dispatch(
      addToCart({
        product,
        qty,
        source: "singleProduct",
      }),
    );
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 5000);
  };
  const handleShopNow1 = () => {
    dispatch(addToCart({ product, source: "productPage_shopNow" }));
    navigate("/cart");
  };

  const stockLabel =
    product.stock === 0
      ? {
          text: "Out of Stock",
          className: "bg-destructive/10 text-destructive",
        }
      : product.stock <= 5
        ? {
            text: `Only ${product.stock} left`,
            className: "bg-amber-500/10 text-amber-700",
          }
        : { text: "In Stock", className: "bg-emerald-500/10 text-emerald-700" };

  const outOfStock = product.stock === 0;

  const handleQty = (delta) => {
    setQty((q) => Math.min(Math.max(1, q + delta), product.quantity || 1));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 pt-6 text-sm text-muted-foreground">
        <Link to="/product" className="hover:text-foreground">
          Product
        </Link>{" "}
        / <span>{product.category}</span> /{" "}
        <span className="text-foreground">{product.name}</span>
      </div>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-8 lg:grid-cols-2">
        <div>
          <div className="group relative overflow-hidden rounded-2xl  bg-muted">
            {product.featured && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                ★ Featured
              </span>
            )}
            {product.discount > 0 && (
              <span className="absolute right-4 top-4 z-10 rounded-full bg-destructive px-3 py-1 text-xs font-semibold text-destructive-foreground">
                {product.discount}% OFF
              </span>
            )}
            <img
              src={product.images[0]}
              alt={product.name}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((src, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`overflow-hidden rounded-lg border-2 transition ${activeImage === i ? "border-primary" : "border-transparent hover:border-border"}`}
              >
                <img
                  src={src}
                  alt={`${product.name} ${i + 1}`}
                  className="aspect-square w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">
            by{" "}
            <span className="font-medium text-foreground">{product.brand}</span>
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight text-foreground lg:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-2">
            <Stars value={product.rating} />
            <span className="text-sm text-muted-foreground">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="mt-6 flex items-end gap-3">
            <span className="text-3xl font-bold text-foreground">
              ₹{product.price.toLocaleString()}
            </span>
            <span className="text-lg text-muted-foreground line-through">
              {/* ₹{product.compareAtPrice.toLocaleString()} */}
            </span>
            <span className="text-sm font-semibold text-emerald-600">
              {product.discount}% OFF
            </span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Inclusive of all taxes
          </p>

          <div className="mt-5">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${stockLabel.className}`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {stockLabel.text}
            </span>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Color</h3>
              <span className="text-sm text-muted-foreground">{color}</span>
            </div>
            <div className="flex gap-3">
              {product.colors.map((c) => (
                <div className="flex gap-3">
                  {console.log(c)}
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      title={c}
                      className={`h-10 w-10 rounded-full border-2 transition ${
                        color === c
                          ? "border-primary ring-1 ring-primary/10"
                          : "border-border"
                      }`}
                      style={{ backgroundColor: c.toLowerCase() }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-foreground">Size</h3>
              <button className="text-xs text-primary hover:underline">
                Size guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-[3rem] rounded-lg border px-4 py-2 text-sm font-medium transition ${size === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:border-primary"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold text-foreground">
              Quantity
            </h3>
            <div className="inline-flex items-center rounded-lg border">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // prevent parent click
                  handleQty(-1);
                }}
                disabled={qty <= 1}
                className="px-4 py-2 text-lg disabled:opacity-40"
              >
                −
              </button>
              <span className="w-12 text-center font-medium">{qty}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleQty(1);
                }}
                disabled={qty >= product.stock}
                className="px-4 py-2 text-lg disabled:opacity-40"
              >
                +
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleShopNow}
              disabled={outOfStock}
              className={`flex-1 rounded-xl border-2 border-primary bg-background px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground disabled:cursor-not-allowed disabled:opacity-50 ${
                thisProduct ? "bg-black text-white" : ""
              }`}
            >
              {thisProduct?.cartQuantity ? "Added to cart" : "Add to cart"}
            </button>
            <button
              onClick={handleShopNow1}
              disabled={outOfStock}
              className="flex-1 border rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 border-t pt-6 text-center text-xs text-muted-foreground">
            <div>🚚 Free shipping</div>
            <div>↩️ 30-day returns</div>
            <div>🔒 Secure checkout</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl border-t px-4 py-12">
        <h2 className="text-2xl font-bold text-foreground">
          Product Description
        </h2>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        {/* 
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-foreground">Tags:</span>
          {product.tags.map((t) => (
            <span
              key={t}
              className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
            >
              #{t} || ""
            </span>
          ))}
        </div> */}
      </section>

      <section className="mx-auto max-w-7xl border-t px-4 py-12">

        {/* NEED TO ADD THIS IS SETION NEXT UPDATE */}

        
        {/* <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-foreground">
            You may also like
          </h2>
          <Link to="/product" className="text-sm text-primary hover:underline">
            View all
          </Link>
        </div> */}
        {/* <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {related.map((r) => (
            <div
              key={r.id}
              className="group cursor-pointer overflow-hidden rounded-xl border bg-card transition hover:shadow-lg"
            >
              <div className="overflow-hidden bg-muted">
                <img
                  src={r.image}
                  alt={r.name}
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="truncate text-sm font-medium text-foreground">
                  {r.name}
                </h3>
                <p className="mt-1 font-semibold text-foreground">
                  ₹{r.price.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div> */}
      </section>
    </div>
  );
}
