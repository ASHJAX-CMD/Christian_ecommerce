const AdminProductsSkeleton = () => {
  return (
    <div className="flex flex-col min-h-screen w-full p-4 gap-10 animate-pulse">
      
      {/* Header Skeleton */}
      <div className="flex w-full flex-col gap-3">
        <div className="flex w-full bg-white p-4 rounded-xl justify-between items-center shadow-sm">
          
          {/* Search */}
          <div className="flex gap-2 w-full max-w-md">
            <div className="h-10 w-full bg-gray-200 rounded-lg"></div>
            <div className="h-10 w-24 bg-gray-200 rounded-lg"></div>
          </div>

          {/* Button */}
          <div className="h-10 w-40 bg-gray-200 rounded-lg"></div>
        </div>
      </div>

      {/* Title */}
      <div className="h-6 w-40 bg-gray-200 rounded"></div>

      {/* Products Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-sm p-4 space-y-3"
          >
            <div className="h-40 bg-gray-200 rounded-lg"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-8 w-full bg-gray-200 rounded-md"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProductsSkeleton;