const ProductsSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse">


      {/* ================= HERO VIDEO ================= */}
      <section className="flex justify-center items-center px-4 py-8">
        <div className="w-full md:w-[90%] lg:w-full max-w-[1600px]">
          <div className="w-full h-[400px] bg-gray-200 rounded-2xl"></div>

          <div className="h-10 w-1/2 bg-gray-200 mt-4 rounded"></div>
        </div>
      </section>

      {/* ================= TITLE + TEXT ================= */}
      <div className="bg-[#fefadf] p-8 space-y-4">
        <div className="h-10 w-72 bg-gray-300 rounded"></div>
        <div className="h-4 w-[60%] bg-gray-200 rounded"></div>
        <div className="h-4 w-[50%] bg-gray-200 rounded"></div>

        <div className="h-6 w-48 bg-gray-300 mt-8 rounded"></div>
      </div>

      {/* ================= PRODUCTS GRID ================= */}
      <div className="flex gap-6 px-12 py-6">
        {/* Product cards */}
        <div className="flex gap-4 flex-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="w-56 h-72 bg-white shadow-sm rounded-xl p-4 space-y-3"
            >
              <div className="h-40 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
              <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
            </div>
          ))}
        </div>

        {/* Filter sidebar skeleton (optional) */}
        <div className="w-60 space-y-4">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>

          <div className="h-6 bg-gray-200 rounded mt-6"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* ================= IDEAS SECTION ================= */}
      <div className="p-10 space-y-4">
        <div className="h-6 w-48 bg-gray-300 rounded"></div>
        <div className="h-40 bg-gray-200 rounded-xl"></div>
      </div>

      {/* ================= IMAGE GRID ================= */}
      <div className="grid grid-cols-3 gap-4 p-8 px-14">
        <div className="row-span-3 h-[500px] bg-gray-200 rounded-2xl"></div>
        <div className="row-span-2 h-[300px] bg-gray-200 rounded-2xl"></div>
        <div className="h-[200px] bg-gray-200 rounded-2xl"></div>
        <div className="row-span-2 h-[300px] bg-gray-200 rounded-2xl"></div>
        <div className="h-[200px] bg-gray-200 rounded-2xl"></div>
      </div>

      {/* ================= BESTSELLER SECTION ================= */}
      <div className="flex px-12 p-6 gap-4">
        <div className="w-[40%] h-[300px] bg-gray-200 rounded-xl"></div>
        <div className="flex-1 h-[300px] bg-gray-200 rounded-xl"></div>
      </div>

      {/* ================= TEXT SECTION ================= */}
      <div className="p-10 space-y-3">
        <div className="h-6 w-80 bg-gray-300 rounded"></div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-[90%] bg-gray-200 rounded"></div>
        <div className="h-4 w-[80%] bg-gray-200 rounded"></div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="h-40 bg-gray-200 mt-10"></div>
    </div>
  );
};

export default ProductsSkeleton;