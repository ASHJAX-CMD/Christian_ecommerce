const ProductPageSkeleton = () => {
  return (
    <div className="min-h-screen animate-pulse">

      {/* ================= HEADER ================= */}
      <div className="h-20 bg-gray-200 w-full"></div>

      <div className="p-8 px-10">

        {/* ================= TITLE ================= */}
        <div className="flex flex-col gap-5 mb-6">
          <div className="h-10 w-80 bg-gray-300 rounded"></div>
          <div className="h-4 w-[70%] bg-gray-200 rounded"></div>
          <div className="h-4 w-[60%] bg-gray-200 rounded"></div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="flex gap-8">

          {/* ===== FILTER SIDEBAR ===== */}
          <div className="w-52 bg-[#fefadf] p-4 rounded-lg shadow-md space-y-4">
            
            {/* Filter section */}
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-24 bg-gray-300 rounded"></div>
                <div className="h-3 w-20 bg-gray-200 rounded"></div>
                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                <div className="h-3 w-24 bg-gray-200 rounded"></div>
              </div>
            ))}

          </div>

          {/* ===== PRODUCTS SECTION ===== */}
          <div className="flex-1">

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm p-4 space-y-3"
                >
                  {/* Image */}
                  <div className="h-40 bg-gray-200 rounded"></div>

                  {/* Title */}
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>

                  {/* Price */}
                  <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                </div>
              ))}

            </div>

            {/* Load More */}
            <div className="flex justify-center mt-6">
              <div className="h-10 w-40 bg-gray-200 rounded-full"></div>
            </div>

          </div>
        </div>

        {/* ================= TEXT SECTION ================= */}
        <div className="flex flex-col gap-8 pt-10">
          
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-6 w-64 bg-gray-300 rounded"></div>
              <div className="h-4 w-[60%] bg-gray-200 rounded"></div>
              <div className="h-4 w-[55%] bg-gray-200 rounded"></div>
              <div className="h-4 w-[50%] bg-gray-200 rounded"></div>
            </div>
          ))}

        </div>

        {/* ================= TAG GRID ================= */}
        <div className="grid grid-cols-3 gap-4 pt-14">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 w-40 bg-gray-200 rounded"></div>
          ))}
        </div>

        {/* ================= FEEDBACK ================= */}
        <div className="flex justify-center pt-12">
          <div className="flex flex-col gap-4 items-center">
            <div className="h-4 w-48 bg-gray-200 rounded"></div>
            <div className="h-10 w-40 bg-gray-300 rounded-full"></div>
          </div>
        </div>

      </div>

      {/* ================= FOOTER ================= */}
      <div className="h-40 bg-gray-200 mt-10"></div>
    </div>
  );
};

export default ProductPageSkeleton;