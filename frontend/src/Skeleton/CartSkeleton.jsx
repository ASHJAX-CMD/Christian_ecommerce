const CartSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-100 animate-pulse">

      {/* ================= HEADER ================= */}
      <div className="h-20 bg-gray-200 w-full"></div>

      <div className="flex">

        {/* ================= CART ITEMS ================= */}
        <div className="p-16 w-[80%] px-12">
          <div className="flex flex-col p-8 bg-white rounded-3xl gap-12">

            {/* Title */}
            <div className="h-8 w-48 bg-gray-300 rounded"></div>

            {/* Items */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-6 border-b py-6"
              >
                {/* LEFT */}
                <div className="flex gap-4 flex-1">
                  <div className="w-32 h-32 bg-gray-200 rounded-lg"></div>

                  <div className="flex flex-col gap-2">
                    <div className="h-5 w-40 bg-gray-200 rounded"></div>
                    <div className="h-4 w-64 bg-gray-200 rounded"></div>
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="h-10 w-24 bg-gray-200 rounded"></div>

                {/* PRICE */}
                <div className="h-5 w-16 bg-gray-200 rounded"></div>
              </div>
            ))}

          </div>
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        <div className="bg-white flex flex-col gap-4 h-fit mt-18 rounded-3xl p-4 w-[20%]">

          <div className="h-5 w-40 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>

          {/* Address */}
          <div className="border p-2 rounded space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-4 w-40 bg-gray-200 rounded"></div>
            <div className="h-4 w-36 bg-gray-200 rounded"></div>
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
          </div>

          {/* Button */}
          <div className="h-10 w-full bg-gray-300 rounded-2xl"></div>
        </div>

      </div>
    </div>
  );
};

export default CartSkeleton;