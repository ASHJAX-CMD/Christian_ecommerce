const ProductPageSkeleton = () => {
  return (
    <>
 
      {Array.from({ length: 8 }).map((_, i) => (
     <div
    key={i}
    className="bg-white  rounded-xl shadow-sm p-4 space-y-3 animate-pulse flex flex-col"
  >
    <div className="h-40 bg-gray-200 rounded-lg"></div>
    <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
    <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
    <div className="h-8 w-full bg-gray-200 rounded-md"></div>
  </div>
      ))}
      {/* {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-sm p-4 space-y-3"
        >
          <div className="h-40 bg-gray-200 rounded"></div>
          <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
        </div>
      ))} */}
    </>
  );
};

export default ProductPageSkeleton;
